const passport = require('passport');
const path = require('path');
var crypto = require('crypto');
var LocalStrategy = require('passport-local').Strategy;

const userController = require('./userController');
const DataService = require ('../services/dataService.js');
const FileService = require ('../services/fileService.js');

const USERS_FILE_NAME = path.join(process.cwd(), 'db', 'users.json');
const dataService = new DataService(USERS_FILE_NAME);
const fileService = new FileService(USERS_FILE_NAME);

exports.localStrategy = new LocalStrategy(async function verify(username, password, cb){
  try {
    const users = await fileService.readData();
    const user = dataService.findEntityByProperty('username', username, users);

    if (!user) {
      return cb(null, false, { message: 'Incorrect username or password.'});
    }
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(Buffer.from(user.password, 'hex'), hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  } catch (error) {
    return cb(error);
  }
});

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

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureMessage: true
});