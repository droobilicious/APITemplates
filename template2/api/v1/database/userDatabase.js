// In src/api/v1/database/userDatabase.js

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

var db = require("./database.js")


/* Check if user exists */
const checkUsername = async (username) => {
  console.log("userDatabase checkUsername");

  const sql = `SELECT COUNT(*) As count FROM users WHERE username=?`;
  const params = [username];

  const [data, error] = await db.query(sql, params);

  if (error){
    return [null, error];
  }

  if (data[0].count){
    return [true, null];
  }

  return [false, null];


};





/* get all users */
const getAllUsers = async () => {
  console.log("userDatabase getAllUsers");


  const sql = `SELECT * FROM users`;
  const params = [];

  const [data, error] = await db.query(sql, params);

  if (error){
    //console.log("userDatabase getAllUsers error")
    throw { status: 500, message: error.code };
  }

  //console.log("userDatabase getAllUsers data:", JSON.stringify(data));
  return data;


};




/* create a new user - C */
const createNewUser = async (newUser) => {
  console.log("userDatabase createNewUser");

  //check if user already exists
  const [alreadyExists, error] = await checkUsername(newUser.username);
  if (error){
    throw {
      status: 400,
      message: `Error checking username`,
    };
  }



  if (alreadyExists){
    throw {
      status: 400,
      message: `User already exists`,
    };
  }

  
  // insert into db or return error
  const sql = `INSERT 
               INTO users (
                  username,
                  email,
                  hashed_password,
                  createdAt,
                  updatedAt
                ) 
                VALUES(?,?,?,?,?)
              `;
  const params = [
    newUser.username,
    newUser.email,
    newUser.hashed_password,
    newUser.createdAt,
    newUser.updatedAt
  ];
  
  //console.log(`params: ${JSON.stringify(params)}`)
  const [data, error2] = await db.query(sql, params);
  
  if (error2){
    throw { status: 500, message: error2?.message || error2 };
  }

  return newUser;


};


/* Get an user - R */
const getOneUser = async (userId) => {
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
const updateOneUser = async (userId, changes) => {
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
const deleteOneUser = async (userId) => {
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