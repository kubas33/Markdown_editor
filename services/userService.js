// const { readFile, writeFile } = require('fs').promises;
// const crypto = require('crypto');

// import {readJSONData, writeJSONData} from './fileService';
// const User = require('../models/userModel');

// class UserService {
//   /**
//    * @param {any} usersFilePath
//    */
//   constructor(usersFilePath) {
//     this.usersFilePath = usersFilePath;
//   }

//   /**
//    * Description placeholder
//    * @date 9/21/2023 - 10:31:40 AM
//    *
//    * @async
//    * @returns {unknown}
//    */
//   async readUserData() {
//     try {
//       await readJSONData(this.usersFilePath);
//       return JSON.stringify(data);
//     } catch (error) {
//       console.error('Błąd podczas wczytywania danych JSON: ', error);
//       throw error; // Rzuć wyjątek, aby obsłużyć go na wyższym poziomie
//     }
//   }
// }

// module.exports = UserService;