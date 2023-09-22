const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const DataService = require ('../services/dataService.js');

const router = express.Router();

const USERS_FILE_NAME = path.join(process.cwd(), 'db', 'users.json');
const dataService = new DataService(USERS_FILE_NAME);

passport.use(new LocalStrategy(async function(username, password, done) {
  try {
    const user = await userController.login(username, password);
    done(null, user);
  } catch (err) {
    done(null, false, { message: err.message });
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const users = await dataService.loadData();
  const user = users.find(user => user.id === id);

  if (user) {
    done(null, user);
  } else {
    done(new Error('User not found'));
  }
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', authController.signup);

router.post('/login', authController.login);

module.exports = router;