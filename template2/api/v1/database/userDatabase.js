// In src/api/v1/database/userDatabase.js

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

/* get all users */
  const getAllUsers = () => {
    console.log("userDatabase getAllUsers");
    try {
      return DB.users;
    } catch (error) {
      throw { status: 500, message: error };
    }
  };




/* create a new user - C */
  const createNewUser = (newUser) => {
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


/* Get an user - R */
  const getOneUser = (userId) => {
    console.log("userDatabase getOneUser");
    try {
      const user = DB.users.find( (user) => user.id == userId);  // changed === to == here because some id's are just integers
      if (!user) {
        throw {
          status: 400,
          message: `Can't find user with the id '${userId}'`,
        };
      }
      return user;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };


/* Update an user - U */
const updateOneUser = (userId, changes) => {
  console.log("userDatabase updateOneUser");
  try {
    
    // check if the new name already exists
    const alreadyExists = DB.users.findIndex( (user) => user.name === changes.name ) > -1;

    if (alreadyExists) {
      throw {
        status: 400,
        message: `User with the name '${changes.name}' already exists`,
      };
    }

    // find the index of the user to update
    const indexForUpdate = DB.users.findIndex( (user) => user.id == userId  );   // changed === to == here because some id's are just integers
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userId}'`,
      };
    }

    // build the updated user
    const updatedUser = {
      ...DB.users[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    // make the change
    DB.users[indexForUpdate] = updatedUser;
    saveToDatabase(DB);

    //return the updated user
    return updatedUser;

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

/* Delete an user - D */
const deleteOneUser = (userId) => {
  console.log("userDatabase deleteOneUser");
  try {
    const indexForDeletion = DB.users.findIndex( (user) => user.id == userId );  // changed === to == here because some id's are just integers

    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userId}'`,
      };
    }

    DB.users.splice(indexForDeletion, 1);
    saveToDatabase(DB);

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};



/* get users of a single user */
/*
const getUserUsers = (user_id) => {
  return DB.users.filter( user => user.owner_id === user_id);
}
*/



/* move */
/*
const getAllUsers = () => {
  return DB.users;
};
*/

module.exports = { 
  getAllUsers,
  createNewUser,  // C
  getOneUser,     // R
  updateOneUser,  // U
  deleteOneUser   // D

  
};