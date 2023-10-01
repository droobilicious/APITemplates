// In src/api/v1/controllers/userController.js

const userService = require("../services/userService");

// Validation
const { validationResult } = require('express-validator'); //for form validatio


// Get all users
const getAllUsers = async (req, res) => {
    console.log("userController getAllUsers");
 
    try{
        const data = await userService.getAllUsers();
        console.log("userController getAllUsers: data:", JSON.stringify(data));
        res.send({ status: "OK", data: data });

    }catch(error){
        console.log("userController getAllUsers: error getting users")
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
 


 };


// Create new user - C
const createNewUser = async (req, res) => {
   console.log("userController createNewUser");
   const { body } = req;

    //get validation result
    const result = validationResult(req);
    
    if (!result.isEmpty())
    {
        console.log("Data was not valid");
        //  TODO: transform errors to fit standard format?
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
   
   //create new user
   const newUser = {
      username: body.username,
      email: body.email,
      password:  body.password
   };

   // create the user or return an error
   try {
      const createdUser = await userService.createNewUser(newUser);
      res.status(201).send({ status: "OK", data: createdUser });
   }
   catch (error) {
      res
         .status(error?.status || 500)
         .send({ status: "FAILED", data: { error: error?.message || error } });
   }

};



// Get one user - R
const getOneUser = async (req, res) => {
    console.log("userController getOneUser");
    const {
        params: { userId },
    } = req;
    
    if (!userId) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: { error: "Parameter ':userId' cannot be empty" },
        });
    }

    try {
        const user = await userService.getOneUser(userId);
        res.send({ status: "OK", data: user });
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
};
    

// Update an User - U
const updateOneUser = async (req, res) => {
    
    console.log("userController updateOneUser");
    const {
        body,
        params: { userId },
        } = req;

        if (!userId) {
        res
            .status(400)
            .send({
            status: "FAILED",
            data: { error: "Parameter ':userId' cannot be empty" },
            });
        }

        // validation?

        // build user
        const changedUser = body;

        // Update User
        try {
            const updatedUser = await userService.updateOneUser(userId, changedUser);
            res.send({ status: "OK", data: updatedUser });
        } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
};


// Delete one user - D
const deleteOneUser = async (req, res) => {
    console.log("userController deleteOneUser");
    const {
        params: { userId },
        } = req;

    if (!userId) {
        res
            .status(400)
            .send({
            status: "FAILED",
            data: { error: "Parameter ':userId' can not be empty" },
            });
    }

    //delete user
    try {
        console.log("Trying to delete");
        await userService.deleteOneUser(userId);
        res
            .status(204)
            .send({ status: "OK" });  //this content isnt sent for a 204.  If doing soft delete then change to status 200

    } catch (error) {
        console.log("Error in deleting");
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    console.log("done delete");

};
 
module.exports = {
    getAllUsers,
    createNewUser, // C
    getOneUser,    // R
    updateOneUser, // U
    deleteOneUser, // D
};