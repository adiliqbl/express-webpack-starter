const index = require('../controllers/index');

module.exports = function (app, isProduction, passport) {

    app.get(['/', '/home'], index.home);
};