// In src/api/v1/database/itemDatabase.js

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");
var db = require("./database.js")

/* Check if user exists */
const itemExists = async (itemname) => {

  const sql = `SELECT COUNT(*) As count FROM items WHERE name=?`;
  const params = [itemname];

  const [data, error] = await db.query(sql, params);

  if (error){
    return [null, error];
  }

  if (data[0].count){
    return [true, null];
  }

  return [false, null];


};





/* get all items */
const getAllItems = async () => {

  const sql = `SELECT * FROM items`;
  const params = [];

  const [data, error] = await db.query(sql, params);

  if (error){

    throw { status: 500, message: error.code };
  }

  return data;

};




/* create a new item - C */
const createNewItem = async (newItem) => {
  console.log("itemDatabase createNewItem");

  //check if item already exists
  const [alreadyExists, existserror] = await itemExists(newItem.name);
  if (existserror){
    throw { status: 400, message: `Error checking item` };
  }

  //stop if item already exists
  if (alreadyExists){
    throw { status: 400, message: `Item already exists` };
  }

  //create item to insert
  const itemToInsert = {
    ...newItem,
    updatedAt: new Date().toISOString()
  };


  // insert into db or return error
  const sql = `INSERT INTO items (name, owner_id, updatedAt) VALUES(?,?,?)`;
  const params = [itemToInsert.name, itemToInsert.owner_id, itemToInsert.updatedAt];
  
  //console.log(`params: ${JSON.stringify(params)}`)
  const [data, error] = await db.query(sql, params);
  
  if (error){
    throw { status: 500, message: error2?.message || error };
  }

  return itemToInsert;

};


/* Get an item - R */
const getOneItem = async (itemId) => {
  console.log("itemDatabase getOneItem");

   // insert into db or return error
   const sql = `SELECT * FROM items WHERE id=?`;
   const params = [itemId];
   
   //console.log(`params: ${JSON.stringify(params)}`)
   const [data, error] = await db.query(sql, params);
   
   if (error){
     throw { status: error?.status || 500, message: error?.message || error };
   }
 
   return data;

};


/* Update an item - U */
const updateOneItem = async (itemId, changes) => {
  console.log("itemDatabase updateOneItem");

  //check if new item name already exists
  const [alreadyExists, existserror] = await itemExists(changes.name);
  if (existserror){
    throw { status: 400, message: `Error checking item` };
  }

  //stop if item already exists
  if (alreadyExists){
    throw { status: 400, message:  `Item with the name '${changes.name}' already exists`};
  }


  // build the updated item
  const updatedItem = {
    ...changes,
    updatedAt: new Date().toISOString(),
  };

  console.log(`updatedItem: ${JSON.stringify(updatedItem)}`);

   // insert into db or return error
   const sql = `UPDATE items 
                SET ${ Object.keys(updatedItem).join("=?, ")}=?
                WHERE id=?` 
            
   const params = [...Object.values(updatedItem), itemId];
   
   //console.log(`params: ${JSON.stringify(params)}`)
   const [data, error] = await db.query(sql, params);
   
   if (error){
     throw { status: 500, message: error2?.message || error };
   }
 
   return updatedItem;
 
};

/* Delete an item - D */
const deleteOneItem = async (itemId) => {
  console.log("itemDatabase deleteOneItem");

  const sql = `DELETE FROM items WHERE id=?` 
  const params = [itemId];

  //console.log(`params: ${JSON.stringify(params)}`)
  const [data, error] = await db.query(sql, params);

  if (error){
    throw { status: 500, message: error2?.message || error };
  }

  return;

};



module.exports = { 
  getAllItems,
  createNewItem,  // C
  getOneItem,     // R
  updateOneItem,  // U
  deleteOneItem   // D

  
};