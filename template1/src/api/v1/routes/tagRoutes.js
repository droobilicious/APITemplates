// In src/v1/routes/tagRoutes.js
 
const express = require("express");

//load controller
const tagController = require("../controllers/tagController");

//load router
const router = express.Router();

// get all
router.get("/", tagController.getAllTags);
 
// get one
router.get("/:tagId", tagController.getOneTag);

//create one
router.post("/", tagController.createNewTag);

// update one 
router.patch("/:tagId", tagController.updateOneTag);

// Delete one 
router.delete("/:tagId", tagController.deleteOneTag);



module.exports = router;