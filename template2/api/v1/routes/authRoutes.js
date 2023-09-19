// In src/api/v1/routes/itemRoutes.js
 
const express = require("express");

//Validation
const { checkSchema } = require("express-validator"); //for validation
const signInSchema = require("../validationSchema/signupSchema");
const loginSchema = require("../validationSchema/loginSchema");


//load authController
const authController = require("../controllers/authController");

//load router
const router = express.Router();

// process login
/* do authentication and authorization for this endpoint */
//router.get("/", checkSchema(loginSchema), authController.doLogin);


// process login
router.post("/login", checkSchema(loginSchema), authController.doLogin);

// process signup
router.post("/signup", checkSchema(signInSchema), authController.doSignUp);

// exchange refresh for access token
router.post("/token", authController.doTokenExchange);


module.exports = router;