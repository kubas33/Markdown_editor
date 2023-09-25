const asyncHandler = require('../node_modules/express-async-handler');
const path = require('path');
const crypto = require('crypto');
const DataService = require('../services/dataService');
const FileService = require ('../services/fileService.js');
const User = require('../models/userModel');

const USERS_FILE_NAME = path.join(process.cwd(), 'db', 'users.json');
const dataService = new DataService(USERS_FILE_NAME);
const fileService = new FileService(USERS_FILE_NAME);

exports.user_list = asyncHandler(async (req, res, next) => {

});

exports.user_detail = asyncHandler(async (req, res, next) => {

});

exports.signup = async function(username, password, email) {
  const salt = crypto.randomBytes(16);
  console.log('Salt:', salt.toString('hex'));
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256');
  const id = await dataService.generateEntityId();
  const users = await fileService.readData();

  const newUser = new User(
    id,
    username,
    hashedPassword.toString('hex'),
    salt.toString('hex'),
    email, // email
    new Date(), // createdAt
    new Date(), // modifiedAt
    false // isDeleted
  );

  users.push(newUser);
  await fileService.writeData(users);

  return newUser;
};

// exports.login = async function(username, password) {
//   const users = await dataService.readData();
//   const user = dataService.findEntityByProperty(users.username, username); //users.find(user => user.username === username); 
//   console.log(user);
//   if (!user) {
//     throw new Error('Incorrect username or password.');
//   }

//   const hashedPassword = crypto.pbkdf2Sync(password, Buffer.from(user.salt, 'hex'), 310000, 32, 'sha256').toString('hex');

//   if (user.hashed_password !== hashedPassword) {
//     throw new Error('Incorrect username or password.');
//   }

//   return user;
// };

exports.user_delete = asyncHandler(async (req, res, next) => {

});

exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user update GET');
});

exports.user_update_put = asyncHandler(async (req, res, next) => {

});