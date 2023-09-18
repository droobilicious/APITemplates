// In src/api/v1/database/tagDatabase.js

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

/* get all tags */
  const getAllTags = () => {
    console.log("tagDatabase getAllTags");
    try {
      return DB.tags;
    } catch (error) {
      throw { status: 500, message: error };
    }
  };




/* create a new tag - C */
  const createNewTag = (newTag) => {
    console.log("tagDatabase createNewTag");

    const alreadyExists = DB.tags.findIndex((tag) => tag.name === newTag.name) > -1;
    if (alreadyExists) {
      throw {
        status: 400,
        message: `Tag already exists`,
      };
    }

    // insert into db or return error
    try {
      DB.tags.push(newTag);
      saveToDatabase(DB);
      return newTag;
    }
    catch (error) {
      throw { status: 500, message: error?.message || error };
    }

  };


/* Get an tag - R */
  const getOneTag = (tagId) => {
    console.log("tagDatabase getOneTag");
    try {
      const tag = DB.tags.find( (tag) => tag.id == tagId);  // changed === to == here because some id's are just integers
      if (!tag) {
        throw {
          status: 400,
          message: `Can't find tag with the id '${tagId}'`,
        };
      }
      return tag;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };


/* Update an tag - U */
const updateOneTag = (tagId, changes) => {
  console.log("tagDatabase updateOneTag");
  try {
    
    // check if the new name already exists
    const alreadyExists = DB.tags.findIndex( (tag) => tag.name === changes.name ) > -1;

    if (alreadyExists) {
      throw {
        status: 400,
        message: `Tag with the name '${changes.name}' already exists`,
      };
    }

    // find the index of the tag to update
    const indexForUpdate = DB.tags.findIndex( (tag) => tag.id == tagId  );   // changed === to == here because some id's are just integers
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find tag with the id '${tagId}'`,
      };
    }

    // build the updated tag
    const updatedTag = {
      ...DB.tags[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    // make the change
    DB.tags[indexForUpdate] = updatedTag;
    saveToDatabase(DB);

    //return the updated tag
    return updatedTag;

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

/* Delete an tag - D */
const deleteOneTag = (tagId) => {
  console.log("tagDatabase deleteOneTag");
  try {
    const indexForDeletion = DB.tags.findIndex( (tag) => tag.id == tagId );  // changed === to == here because some id's are just integers

    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find tag with the id '${tagId}'`,
      };
    }

    DB.tags.splice(indexForDeletion, 1);
    saveToDatabase(DB);

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};



/* get tags of a single user */
/*
const getUserTags = (user_id) => {
  return DB.tags.filter( tag => tag.owner_id === user_id);
}
*/



/* move */
/*
const getAllTags = () => {
  return DB.tags;
};
*/

module.exports = { 
  getAllTags,
  createNewTag,  // C
  getOneTag,     // R
  updateOneTag,  // U
  deleteOneTag   // D

  
};