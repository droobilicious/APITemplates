// In src/api/v1/services/userService.js
 
const userDB = require("../database/userDatabase");
const { v4: uuid } = require("uuid");
const crypto = require('crypto');  // Used for creating and checking Hash

//var db = require("../database/database.js")



/* get all users */
const getAllUsers = async () => {
  console.log("userService getAllUsers ");

  try {
    const allUsers = await userDB.getAllUsers();
    //console.log("userService getAllUsers returning all users ", JSON.stringify(allUsers));
    return allUsers;
  }
  catch (error) {
    //console.log("userService getAllUsers: error ");
    throw error;
  }

};



/* Create a new User - C */
const createNewUser = async (newUser) => {
  console.log("userService createNewUser ", JSON.stringify(newUser));

  const userToInsert = {
    username: newUser.username,
    email: newUser.email,
    hashed_password: crypto.createHash('md5').update(newUser.password).digest("hex"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  //creatae the user or return an error
  try {
    const createdUser = await userDB.createNewUser(userToInsert);
    console.log("returning createdUser");

    return createdUser;
  } catch (error) {
    console.log("Throwing error");
    throw error;
  }

};
 

/* get a single user by id - R */
const getOneUser = async (userId) => {
  console.log("userService getOneUser ", JSON.stringify(userId));
  try {
    const user = await userDB.getOneUser(userId);
    return user;
  } catch (error) {
    throw error;
  }

};
/* Update an user - U */
const updateOneUser = async (userId, changes) => {
  console.log("userService updateOneUser ", JSON.stringify(userId));
  try {

    const updatedUser = await userDB.updateOneUser(userId, changes);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
 
/* Delete an user - D*/
const deleteOneUser = async (userId) => {
  console.log("userService deleteOneUser ", JSON.stringify(userId));
  try {
    await userDB.deleteOneUser(userId);
    
  } catch (error) {
    throw error;
  }
};

 
module.exports = {
  getAllUsers,
  createNewUser, // C
  getOneUser,    // R
  updateOneUser, // U
  deleteOneUser, // D
};