exports.home = function (req, res) {
    res.render('index', {
        title: "Home"
    });
};

exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login', {
            title: 'Login'
        });
    }
};

exports.logout = function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
};