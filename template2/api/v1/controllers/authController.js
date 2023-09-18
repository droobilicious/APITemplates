// In src/api/v1/controllers/authController.js

const itemService = require("../services/authService");


// Validation
const { validationResult } = require('express-validator'); //for form validatio


// doLogin
const doLogin = (req, res) => {
    console.log("authController doLogin");
    const { body } = req;

    
    //get validation result
    const result = validationResult(req);


    
    //validate input
    if (
        !body.name ||
        !body.owner_id ||
        !Number.isInteger(body.owner_id)
    ){
        console.log("failed validation");
        res
            .status(400)
            .send({
                    status: "FAILED",
                    data: {
                        error:
                        "Validation of the new item failed",
                    },
                }
            );
        return;
    }

    // validation passed
    
    //create new item
    const newItem = {
        name: body.name,
        owner_id: body.owner_id
    };

    // create the item or return an error
    try {
        const createdItem = itemService.createNewItem(newItem);
        res.status(201).send({ status: "OK", data: createdItem });
    }
    catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }

};


 

//  Sign up
const doSignup = (req, res) => {
    console.log("authController doSignup");
    const { body } = req;

    //validate input
    if (
        !body.name ||
        !body.owner_id ||
        !Number.isInteger(body.owner_id)
    ){
        console.log("failed validation");
        res
            .status(400)
            .send({
                    status: "FAILED",
                    data: {
                        error:
                        "Validation of the new item failed",
                    },
                }
            );
        return;
    }

    // validation passed
    
    //create new item
    const newItem = {
        name: body.name,
        owner_id: body.owner_id
    };

    // create the item or return an error
    try {
        const createdItem = itemService.createNewItem(newItem);
        res.status(201).send({ status: "OK", data: createdItem });
    }
    catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }

};



// Get one item - R
const doTokenExchange = (req, res) => {
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
        const item = itemService.getOneItem(itemId);
        res.send({ status: "OK", data: item });
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
};
    

 
module.exports = {
    doLogin,
    doSignup, 
    doTokenExchange, 
};