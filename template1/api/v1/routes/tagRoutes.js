// In src/api/v1/routes/tagRoutes.js
 
const express = require("express");

//load controller
const tagsController = require("../controllers/tagController");

//load router
const router = express.Router();

// get all
router.get("/", tagsController.getAllTags);

//create one - C
router.post("/", tagsController.createNewTag);

// get one - R
router.get("/:tagId", tagsController.getOneTag);

// update one - U
router.patch("/:tagId", tagsController.updateOneTag);

// Delete one - D
router.delete("/:tagId", tagsController.deleteOneTag);


module.exports = router;