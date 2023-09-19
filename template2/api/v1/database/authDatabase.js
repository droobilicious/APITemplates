// In src/api/v1/database/authDatabase.js

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");




/* doLogin 
????
not sure this is needed

*/
const doLogin = (newUser) => {
  console.log("userDatabase createNewUser");

  const alreadyExists = DB.users.findIndex((user) => user.name === newUser.name) > -1;
  if (alreadyExists) {
    throw {
      status: 400,
      message: `User already exists`,
    };
  }

  // insert into db or return error
  try {
    DB.users.push(newUser);
    saveToDatabase(DB);
    return newUser;
  }
  catch (error) {
    throw { status: 500, message: error?.message || error };
  }

};


/* Sign Up */
const doSignUp = (newUser) => {
  console.log("userDatabase createNewUser: ", JSON.stringify(newUser));

  const alreadyExists = DB.users.findIndex((user) => user.name === newUser.name) > -1;
  if (alreadyExists) {
    throw {
      status: 400,
      message: `User already exists`,
    };
  }

  // insert into db or return error
  try {
    DB.users.push(newUser);
    saveToDatabase(DB);
    return newUser;
  }
  catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};


module.exports = { 
  doLogin,
  doSignUp,   
};