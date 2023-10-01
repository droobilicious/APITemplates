// In src/api/v1/controllers/authController.js

const authService = require("../services/authService");

// Validation
const { validationResult } = require('express-validator'); //for form validatio


// doLogin
const doLogin = async (req, res) => {
    console.log("authController doLogin");
    const { body } = req;

    //get validation result
    const result = validationResult(req);

    if (!result.isEmpty()) 
    {
        console.log("Data was not valid");
        // TODO: transform errors to fit standard format?
        res.status(400)
           .send({
                    status: "FAILED",
                    data: {
                        error:
                        "Login data was not correct",
                        errors: result.errors 
                    },
                }
            );
        return;
       
    }

    // validation passed
    
    //create new item
    const loginAttempt = {
        username: body.username,
        password: body.password
    };

    // create the item or return an error
    try {
        const loginResult = await authService.doLogin(loginAttempt);

        res.status(201).send({ status: "OK", data: loginResult });
    }
    catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }

};



//  Sign up
const doSignUp = async (req, res) => {

    console.log("authController doSignUp");
    const { body } = req;

    //get validation result
    const result = validationResult(req);
    console.log("authController doSignUp: Validation result:" , JSON.stringify(result));

    //validate input
    if (!result.isEmpty()) 
    {
        console.log("Data was not valid");
        // TODO: transform errors to fit standard format?
        res.status(400)
           .send({
                    status: "FAILED",
                    data: {
                        error:
                        "Validation of the new user failed",
                        errors: result.errors 
                    },
                }
            );
        return;
       
    }

    // validation passed
    console.log("authController doSignUp: Validation Passed");

    const newUser = {
        username: body.username,
        email: body.email,
        password:  body.password
    };


    // create the item or return an error
    try {
        const createdUser = await authService.doSignUp(newUser);
        res.status(201).send({ status: "OK", data: createdUser });
    }
    catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }

};



// Get one item - R
const doTokenExchange = async (req, res) => {
    console.log("authController doTokenExchange");
    const {
        params: { itemId },
    } = req;
    
    if (!itemId) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: { error: "Parameter ':itemId' cannot be empty" },
        });
    }

    try {
        //const item = itemService.getOneItem(itemId);
        res.send({ status: "OK", data: '' });
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
};
    

 
module.exports = {
    doLogin,
    doSignUp, 
    doTokenExchange, 
};