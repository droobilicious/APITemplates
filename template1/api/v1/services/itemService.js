// In src/api/v1/services/itemService.js
 
const itemDB = require("../database/itemDatabase");
const { v4: uuid } = require("uuid");

/* get all items */
const getAllItems = () => {
  console.log("itemService getAllItems ");
    try {
      const allItems = itemDB.getAllItems();
      return allItems;
    }
    catch (error) {
      throw error;
    }

};



/* Create a new Item - C */
const createNewItem = (newItem) => {
  console.log("itemService createNewItem ", JSON.stringify(newItem));

  const itemToInsert = {
    ...newItem,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  //creatae the item or return an error
  try {
    const createdItem = itemDB.createNewItem(itemToInsert);
    return createdItem;
  } catch (error) {
    throw error;
  }

};
 

/* get a single item by id - R */
const getOneItem = (itemId) => {
  console.log("itemService getOneItem ", JSON.stringify(itemId));
  try {
    const item = itemDB.getOneItem(itemId);
    return item;
  } catch (error) {
    throw error;
  }

};
/* Update an item - U */
const updateOneItem = (itemId, changes) => {
  console.log("itemService updateOneItem ", JSON.stringify(itemId));
  try {
    const updatedItem = itemDB.updateOneItem(itemId, changes);
    return updatedItem;
  } catch (error) {
    throw error;
  }
};
 
/* Delete an item - D*/
const deleteOneItem = (itemId) => {
  console.log("itemService deleteOneItem ", JSON.stringify(itemId));
  try {
    itemDB.deleteOneItem(itemId);
    
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