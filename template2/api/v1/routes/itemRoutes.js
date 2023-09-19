// In src/api/v1/routes/itemRoutes.js
 
const express = require("express");

//Validation
const { checkSchema } = require("express-validator"); //for validation
const itemSchema = require("../validationSchema/itemSchema");

//Authentication
//const { checkAuthentication } = require('../.services/authService'); //???



//load controller
const itemsController = require("../controllers/itemController");

//load router
const router = express.Router();



/**
* @api {post} /api/items List All Items
* @apiName List All Items
* @apiPermission user
* @apiGroup User
*
* @apiParam  {String} [userName] username
* @apiParam  {String} [email] Email
* @apiParam  {String} [phone] Phone number
* @apiParam  {String} [status] Status
*
* @apiSuccess (200) {Object} mixed `User` object
*/

router.get("/", itemsController.getAllItems); //checkAuthentication

//create one - C
router.post("/", checkSchema(itemSchema), itemsController.createNewItem);

// get one - R
router.get("/:itemId", itemsController.getOneItem);

// update one - U
router.patch("/:itemId", checkSchema(itemSchema), itemsController.updateOneItem);

// Delete one - D
router.delete("/:itemId", itemsController.deleteOneItem);


module.exports = router;