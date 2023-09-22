const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const DataService = require ('../services/dataService.js');
const FileService = require ('../services/fileService.js');

const router = express.Router();

const USERS_FILE_NAME = path.join(process.cwd(), 'db', 'users.json');
const fileService = new FileService(USERS_FILE_NAME);
const dataService = new DataService(USERS_FILE_NAME);

// passport.use(new LocalStrategy(async function(username, password, done) {
//   try {
//     const user = await userController.login(username, password);
//     done(null, user);
//   } catch (err) {
//     done(null, false, { message: err.message });
//   }
// }));



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const users = await fileService.readData();
  const user = users.find(user => user.id === id);

  if (user) {
    done(null, user);
  } else {
    done(new Error('User not found'));
  }
});

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.post('/login', authController.login);

router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/signup', authController.signup);

module.exports = router;