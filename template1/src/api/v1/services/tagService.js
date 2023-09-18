// In src/api/v1/services/TagService.js
 
const db = require("../database/itemDatabase");


const getAllTags = () => {
    const allTags = db.getAllTags();
   
    return allTags;
  };
 
const getOneTag = () => {
  return;
};
 
const createNewTag = () => {
  return;
};
 
const updateOneTag = () => {
  return;
};
 
const deleteOneTag = () => {
  return;
};
 
module.exports = {
  getAllTags,
  getOneTag,
  createNewTag,
  updateOneTag,
  deleteOneTag,
};