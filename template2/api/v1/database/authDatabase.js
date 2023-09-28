// In src/api/v1/database/authDatabase.js

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");




const getUserByUsername = (username, callback) => {

  try {
    const userExists = DB.users.findIndex( (user) => user.username === newUser.username) > -1;
    if(userExists)
    {
      callback( DB.users[userExists] );
      return
    }
    }
    catch (error) {
      throw { status: 500, message: error?.message || error };
    }
}



/* doLogin 
????
not sure this is needed

*/
const doLogin = (newUser) => {
  console.log("authDatabase createNewUser");

  //check if already exists (maybe do this during validation stage?)
  const alreadyExists = DB.users.findIndex( (user) => user.username === newUser.username) > -1;

  console.log("alreadyExists:", alreadyExists);
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
  console.log("authDatabase createNewUser: ", JSON.stringify(newUser));

  const alreadyExists = DB.users.findIndex( (user) => user.username === newUser.username) > -1;
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