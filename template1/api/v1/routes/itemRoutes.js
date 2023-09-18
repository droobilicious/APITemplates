// In src/api/v1/routes/itemRoutes.js
 
const express = require("express");

//load controller
const itemsController = require("../controllers/itemController");

//load router
const router = express.Router();

// get all
router.get("/", itemsController.getAllItems);

//create one - C
router.post("/", itemsController.createNewItem);

// get one - R
router.get("/:itemId", itemsController.getOneItem);

// update one - U
router.patch("/:itemId", itemsController.updateOneItem);

// Delete one - D
router.delete("/:itemId", itemsController.deleteOneItem);


module.exports = router;