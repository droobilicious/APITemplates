// In src/api/v1/services/userService.js
 
const userDB = require("../database/userDatabase");
const { v4: uuid } = require("uuid");

//var db = require("../database/database.js")



/* get all users */
const getAllUsers = () => {
  console.log("userService getAllUsers ");

  try {
    const allUsers = userDB.getAllUsers();
    console.log("userService getAllUsers returning all users ", JSON.stringify(allUsers));
    return allUsers;
  }
  catch (error) {
    console.log("userService getAllUsers: error ");
    throw error;
  }

};



/* Create a new User - C */
const createNewUser = (newUser) => {
  console.log("userService createNewUser ", JSON.stringify(newUser));

  const userToInsert = {
    ...newUser,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  //creatae the user or return an error
  try {
    const createdUser = userDB.createNewUser(userToInsert);
    return createdUser;
  } catch (error) {
    throw error;
  }

};
 

/* get a single user by id - R */
const getOneUser = (userId) => {
  console.log("userService getOneUser ", JSON.stringify(userId));
  try {
    const user = userDB.getOneUser(userId);
    return user;
  } catch (error) {
    throw error;
  }

};
/* Update an user - U */
const updateOneUser = (userId, changes) => {
  console.log("userService updateOneUser ", JSON.stringify(userId));
  try {
    const updatedUser = userDB.updateOneUser(userId, changes);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
 
/* Delete an user - D*/
const deleteOneUser = (userId) => {
  console.log("userService deleteOneUser ", JSON.stringify(userId));
  try {
    userDB.deleteOneUser(userId);
    
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