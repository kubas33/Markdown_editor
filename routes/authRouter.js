const express = require('express');
const passport = require('passport');
const path = require('path');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const DataService = require ('../services/dataService.js');
const FileService = require ('../services/fileService.js');
const { authMiddlewares  } = require ('../middlewares/authMiddlewares');
const flash = require('connect-flash');

const router = express.Router();

const USERS_FILE_NAME = path.join(process.cwd(), 'db', 'users.json');
const fileService = new FileService(USERS_FILE_NAME);
const dataService = new DataService(USERS_FILE_NAME);

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, {
      id: user.id,
      username: user.username,
    });
  });
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
  res.render('auth/signup', {
    'message': req.flash('error')
  });
});

router.post('/signup', authMiddlewares.isUnique, authController.signup);

module.exports = router;