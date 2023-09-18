// In src/api/v1/database/itemDatabase.js

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

/* get all items */
  const getAllItems = () => {
    console.log("itemDatabase getAllItems");
    try {
      return DB.items;
    } catch (error) {
      throw { status: 500, message: error };
    }
  };




/* create a new item - C */
  const createNewItem = (newItem) => {
    console.log("itemDatabase createNewItem");

    const alreadyExists = DB.items.findIndex((item) => item.name === newItem.name) > -1;
    if (alreadyExists) {
      throw {
        status: 400,
        message: `Item already exists`,
      };
    }

    // insert into db or return error
    try {
      DB.items.push(newItem);
      saveToDatabase(DB);
      return newItem;
    }
    catch (error) {
      throw { status: 500, message: error?.message || error };
    }

  };


/* Get an item - R */
  const getOneItem = (itemId) => {
    console.log("itemDatabase getOneItem");
    try {
      const item = DB.items.find( (item) => item.id == itemId);  // changed === to == here because some id's are just integers
      if (!item) {
        throw {
          status: 400,
          message: `Can't find item with the id '${itemId}'`,
        };
      }
      return item;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };


/* Update an item - U */
const updateOneItem = (itemId, changes) => {
  console.log("itemDatabase updateOneItem");
  try {
    
    // check if the new name already exists
    const alreadyExists = DB.items.findIndex( (item) => item.name === changes.name ) > -1;

    if (alreadyExists) {
      throw {
        status: 400,
        message: `Item with the name '${changes.name}' already exists`,
      };
    }

    // find the index of the item to update
    const indexForUpdate = DB.items.findIndex( (item) => item.id == itemId  );   // changed === to == here because some id's are just integers
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find item with the id '${itemId}'`,
      };
    }

    // build the updated item
    const updatedItem = {
      ...DB.items[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    // make the change
    DB.items[indexForUpdate] = updatedItem;
    saveToDatabase(DB);

    //return the updated item
    return updatedItem;

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

/* Delete an item - D */
const deleteOneItem = (itemId) => {
  console.log("itemDatabase deleteOneItem");
  try {
    const indexForDeletion = DB.items.findIndex( (item) => item.id == itemId );  // changed === to == here because some id's are just integers

    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find item with the id '${itemId}'`,
      };
    }

    DB.items.splice(indexForDeletion, 1);
    saveToDatabase(DB);

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};



/* get items of a single user */
/*
const getUserItems = (user_id) => {
  return DB.items.filter( item => item.owner_id === user_id);
}
*/



/* move */
/*
const getAllTags = () => {
  return DB.tags;
};
*/

module.exports = { 
  getAllItems,
  createNewItem,  // C
  getOneItem,     // R
  updateOneItem,  // U
  deleteOneItem   // D

  
};