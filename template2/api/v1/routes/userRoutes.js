// In src/api/v1/routes/userRoutes.js
 
const express = require("express");

//load controller
const usersController = require("../controllers/userController");

//load router
const router = express.Router();

// get all
router.get("/", usersController.getAllUsers);

//create one - C
router.post("/", usersController.createNewUser);

// get one - R
router.get("/:userId", usersController.getOneUser);

// update one - U
router.patch("/:userId", usersController.updateOneUser);

// Delete one - D
router.delete("/:userId", usersController.deleteOneUser);


module.exports = router;