const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        uppercase: true,
        required: true,
        default: null
    },
    rank: {
        type: Number,
        default: 0
    },
    cnic: {
        type: String,
        default: null
    },
    password: {
        type: String,
        hide: true,
        select: false
        // Users.find().select("+password")
    }
});

UserSchema.virtual('name').get(function () {
    return this.firstname + ' ' + this.lastname;
});
UserSchema.virtual('name').set(function (name) {
    const split = name.split(' ');
    this.firstname = split[0];
    this.lastname = split[1];
});


const User = module.exports = mongoose.model('user', UserSchema, 'user');

/**
 * Database methods
 */
module.exports.comparePassword = async function (candidatePassword, hash, callback) {
    await bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};
module.exports.getUserById = function (id) {
    return User.findById(id);
};

module.exports.getUserByEmail = function (email) {
    const query = {email: email};
    return User.findOne(query);
};

module.exports.update = function (id, DT) {
    return User.findById(id)
        .catch(function (err) {
            handleError(err);
        })
        .then(async function (user) {
            return new Promise(function (resolve) {
                user.set(DT);
                resolve(user);
            })
        })
        .then(async function (user) {
            return user.save()
        });
};

module.exports.create = async function (obj, callback) {
    return bcrypt.hash(obj.password, 10)
        .then(function (hash) {
            obj.password = hash;
            return obj.save();
        }).catch(function (err) {
            return done(err, null);
        });
};