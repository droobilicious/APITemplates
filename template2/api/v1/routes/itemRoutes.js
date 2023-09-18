// In src/api/v1/routes/itemRoutes.js
 
const express = require("express");

//Validation
const { checkSchema } = require("express-validator"); //for validation
const signInSchema = require("../validationSchema/signupSchema");

//Authentication
const { checkAuthentication } = require('../.services/authService'); ???




//load controller
const itemsController = require("../controllers/itemController");

//load router
const router = express.Router();

// get all
router.get("/", checkAuthentication, itemsController.getAllItems);

//create one - C
router.post("/", checkSchema(itemSchema), itemsController.createNewItem);

// get one - R
router.get("/:itemId", itemsController.getOneItem);

// update one - U
router.patch("/:itemId", checkSchema(itemSchema), itemsController.updateOneItem);

// Delete one - D
router.delete("/:itemId", itemsController.deleteOneItem);


module.exports = router;