const passport = require('passport');
const userController = require('./userController');

exports.signup = async function(req, res, next) {
  try {
    const user = await userController.signup(req.body.username, req.body.password, req.body.email);
    req.login(user, function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  } catch (err) {
    next(err);
  }
};

exports.login = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });