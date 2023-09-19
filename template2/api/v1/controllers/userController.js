// In src/api/v1/controllers/userController.js

const userService = require("../services/userService");


// Get all users
const getAllUsers = (req, res) => {
   console.log("userController getAllUsers");
   try {
      const allUsers = userService.getAllUsers();
      res.send({ status: "OK", data: allUsers });
   }catch (error) {
      res
         .status(error?.status || 500)
         .send({ status: "FAILED", data: { error: error?.message || error } });
   }


};


// Create new user - C
const createNewUser = (req, res) => {
   console.log("userController createNewUser");
   const { body } = req;

   //validate
   if (
      !body.name
   ){
      console.log("failed validation");
      res
         .status(400)
         .send({
                  status: "FAILED",
                  data: {
                     error:
                     "Validation of the new user failed",
                  },
               }
         );
      return;
   }

   // validation passed
   
   //create new user
   const newUser = {
      name: body.name,
      owner_id: body.owner_id
   };

   // create the user or return an error
   try {
      const createdUser = userService.createNewUser(newUser);
      res.status(201).send({ status: "OK", data: createdUser });
   }
   catch (error) {
      res
         .status(error?.status || 500)
         .send({ status: "FAILED", data: { error: error?.message || error } });
   }

};



// Get one user - R
    const getOneUser = (req, res) => {
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
            const user = userService.getOneUser(userId);
            res.send({ status: "OK", data: user });
        }
        catch (error) {
            res
              .status(error?.status || 500)
              .send({ status: "FAILED", data: { error: error?.message || error } });
          }
    };
    

// Update an User - U
    const updateOneUser = (req, res) => {
        
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
            const updatedUser = userService.updateOneUser(userId, changedUser);
            res.send({ status: "OK", data: updatedUser });
          } catch (error) {
            res
              .status(error?.status || 500)
              .send({ status: "FAILED", data: { error: error?.message || error } });
          }
    };
 

// Delete one user - D
    const deleteOneUser = (req, res) => {
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
            userService.deleteOneUser(userId);
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