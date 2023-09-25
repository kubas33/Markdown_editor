const FileService = require ('../services/fileService.js');
const path = require('path');
const USERS_FILE_NAME = path.join(process.cwd(), 'db', 'users.json');
const fileService = new FileService(USERS_FILE_NAME);

const authMiddlewares = {
    isUnique: async function (req, res, next) {
        const users = await fileService.readData();
        const { username, email } = req.body;
        const existingUser = users.find(user => user.username === username || user.email === email);

        if (existingUser) {
            if (existingUser.username === username && existingUser.email === email) {
                req.flash('error', 'Both Username and Email already exist');
            } else if (existingUser.username === username) {
                req.flash('error', 'Username already exists');
            } else if (existingUser.email === email) {
                req.flash('error', 'Email already exists');
            }
            return res.redirect('/auth/signup');
        }
        next();
    }
};

module.exports = {
    authMiddlewares,
  };