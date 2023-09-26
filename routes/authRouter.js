const express = require('express');
const passport = require('passport');
const path = require('path');
const authController = require('../controllers/authController');
const FileService = require ('../services/fileService.js');
const { authMiddlewares  } = require ('../middlewares/authMiddlewares');

const router = express.Router();

const USERS_FILE_NAME = path.join(process.cwd(), 'db', 'users.json');
const fileService = new FileService(USERS_FILE_NAME);

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(async function(serializedUser, done) {
  const users = await fileService.readData();
  const user = users.find(user => user.id === serializedUser.id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('User not found'));
  }
});

router.get('/login', function(req, res, next) {
  res.render('auth/login', {
    'message': req.flash('error'),
    'info': req.flash('info')
  });
});

router.post('/login', authController.login);

router.get('/signup', function(req, res, next) {
  res.render('auth/signup', {
    'message': req.flash('error')
  });
});

router.post('/signup', authMiddlewares.isUnique, authController.signup);

router.post('/logout', authController.logout);

module.exports = router;