// In src/api/v1/controllers/itemController.js

const itemService = require("../services/itemService");


// Get all items
const getAllItems = (req, res) => {
    console.log("itemController getAllItems");
    try {
        const allItems = itemService.getAllItems();
        res.send({ status: "OK", data: allItems });
    }catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }


};
 

// Create new item - C
const createNewItem = (req, res) => {
    console.log("itemController createNewItem");
    const { body } = req;

    //validate
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
    const getOneItem = (req, res) => {
        console.log("itemController getOneItem");
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
    

// Update an Item - U
    const updateOneItem = (req, res) => {
        
        console.log("itemController updateOneItem");
        const {
            body,
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

          // validation?

          // build item
          const changedItem = body;

          // Update Item
          try {
            const updatedItem = itemService.updateOneItem(itemId, changedItem);
            res.send({ status: "OK", data: updatedItem });
          } catch (error) {
            res
              .status(error?.status || 500)
              .send({ status: "FAILED", data: { error: error?.message || error } });
          }
    };
 

// Delete one item - D
    const deleteOneItem = (req, res) => {
        console.log("itemController deleteOneItem");
        const {
            params: { itemId },
          } = req;

        if (!itemId) {
            res
                .status(400)
                .send({
                status: "FAILED",
                data: { error: "Parameter ':itemId' can not be empty" },
                });
        }

        //delete item
        try {
            console.log("Trying to delete");
            itemService.deleteOneItem(itemId);
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
    getAllItems,
    createNewItem, // C
    getOneItem,    // R
    updateOneItem, // U
    deleteOneItem, // D
};