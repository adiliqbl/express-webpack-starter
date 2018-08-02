const localStrategy = require('passport-local').Strategy;
const User = require('../data/user');
const bcrypt = require('bcrypt-nodejs');

//expose this function to our app using module.exports
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.getUserById(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                done(err, null);
            })
    });

    /**
     * Login
     */
    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) { // callback with email and password from our form
        User.findOne({email: email}).select("+password")
            .then(function (user) {
                if (!user) {
                    console.log('No user found with email ' + email);
                    return done(null, false, {message: "Unknown user"});
                }
                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Invalid password'});
                    }
                });
            })
            .catch(function (err) {
                return done(err, null);
            })
    }));
};

