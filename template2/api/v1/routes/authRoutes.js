// In src/api/v1/routes/itemRoutes.js
 
const express = require("express");

//Validation
const { checkSchema } = require("express-validator"); //for validation
const signInSchema = require("../validationSchema/signupSchema");



//load authController
const authController = require("../controllers/itemController");

//load router
const router = express.Router();

// process login
router.post("/login", checkSchema(loginSchema), itemsController.doLogin);

// process signup
router.post("/signup", checkSchema(signInSchema), itemsController.doSignup);

// exchange refresh for access token
router.post("/token", itemsController.doTokenExchange);


module.exports = router;