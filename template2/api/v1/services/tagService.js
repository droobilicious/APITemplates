// In src/api/v1/services/tagService.js
 
const tagDB = require("../database/tagDatabase");
const { v4: uuid } = require("uuid");

/* get all tags */
const getAllTags = () => {
  console.log("tagService getAllTags ");
    try {
      const allTags = tagDB.getAllTags();
      return allTags;
    }
    catch (error) {
      throw error;
    }

};



/* Create a new Tag - C */
const createNewTag = (newTag) => {
  console.log("tagService createNewTag ", JSON.stringify(newTag));

  const tagToInsert = {
    ...newTag,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  //creatae the tag or return an error
  try {
    const createdTag = tagDB.createNewTag(tagToInsert);
    return createdTag;
  } catch (error) {
    throw error;
  }

};
 

/* get a single tag by id - R */
const getOneTag = (tagId) => {
  console.log("tagService getOneTag ", JSON.stringify(tagId));
  try {
    const tag = tagDB.getOneTag(tagId);
    return tag;
  } catch (error) {
    throw error;
  }

};
/* Update an tag - U */
const updateOneTag = (tagId, changes) => {
  console.log("tagService updateOneTag ", JSON.stringify(tagId));
  try {
    const updatedTag = tagDB.updateOneTag(tagId, changes);
    return updatedTag;
  } catch (error) {
    throw error;
  }
};
 
/* Delete an tag - D*/
const deleteOneTag = (tagId) => {
  console.log("tagService deleteOneTag ", JSON.stringify(tagId));
  try {
    tagDB.deleteOneTag(tagId);
    
  } catch (error) {
    throw error;
  }
};

 
module.exports = {
  getAllTags,
  createNewTag, // C
  getOneTag,    // R
  updateOneTag, // U
  deleteOneTag, // D
};