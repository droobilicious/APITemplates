// In src/controllers/tagController.js
const tagService = require("../services/tagService");

const getAllTags = (req, res) => {
   
   const allTags = tagService.getAllTags();
   res.send({ status: "OK", data: allTags });
   
};

const getOneTag = (req, res) => {
   res.send("Get an existing Tag");
};

const createNewTag = (req, res) => {
   res.send("Create a new Tag");
};

const updateOneTag = (req, res) => {
   res.send("Update an existing Tag");
};

const deleteOneTag = (req, res) => {
   res.send("Delete an existing Tag");
};

module.exports = {
   getAllTags,
   getOneTag,
   createNewTag,
   updateOneTag,
   deleteOneTag,
};