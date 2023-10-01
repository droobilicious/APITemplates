// In src/api/v1/services/itemService.js
 
const itemDB = require("../database/itemDatabase");
const { v4: uuid } = require("uuid");

/* get all items */
const getAllItems = async () => {
  console.log("itemService getAllItems ");
    try {
      const allItems = await itemDB.getAllItems();
      return allItems;
    }
    catch (error) {
      throw error;
    }

};



/* Create a new Item - C */
const createNewItem = async (newItem) => {
  console.log("itemService createNewItem ", JSON.stringify(newItem));

  //creatae the item or return an error
  try {
    const createdItem = await itemDB.createNewItem(newItem);
    return createdItem;
  } catch (error) {
    throw error;
  }

};
 

/* get a single item by id - R */
const getOneItem = async (itemId) => {
  console.log("itemService getOneItem ", JSON.stringify(itemId));
  try {
    const item = await itemDB.getOneItem(itemId);
    return item;
  } catch (error) {
    throw error;
  }

};


/* Update an item - U */
const updateOneItem = async (itemId, changes) => {
  console.log("itemService updateOneItem ", JSON.stringify(itemId));
  try {
    const updatedItem = await itemDB.updateOneItem(itemId, changes);
    return updatedItem;
  } catch (error) {
    throw error;
  }
};
 
/* Delete an item - D*/
const deleteOneItem = async (itemId) => {
  console.log("itemService deleteOneItem ", JSON.stringify(itemId));
  try {
    await itemDB.deleteOneItem(itemId);
    
  } catch (error) {
    throw error;
  }
};

 
module.exports = {
  getAllItems,
  createNewItem, // C
  getOneItem,    // R
  updateOneItem, // U
  deleteOneItem, // D
};