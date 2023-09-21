const asyncHandler = require('../node_modules/express-async-handler');
const path = require('path');
const UserService = require('../services/userService');
const User = require('../models/userModel');


const USER_FILE_NAME = path.join(process.cwd(), 'db', 'users.json');
const dataService = new UserService(USER_FILE_NAME);

exports.user_list = asyncHandler(async (req, res, next) => {

});

exports.user_detail = asyncHandler(async (req, res, next) => {

});

exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render(`auth/signup`, {});
});

exports.user_create_post = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const now = new Date().toISOString();
    

  } catch (error) {
    console.error('Błąd podczas dodawania nowego dokumentu: ', error);
    res.status(500).json({ success: false, error: 'Wystąpił błąd serwera' });
  }

});

exports.user_delete = asyncHandler(async (req, res, next) => {

});

exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user update GET');
});

exports.user_update_put = asyncHandler(async (req, res, next) => {

});