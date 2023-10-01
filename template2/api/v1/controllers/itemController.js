// In src/api/v1/controllers/itemController.js

// Service
const itemService = require("../services/itemService");

// Validation
const { validationResult } = require('express-validator'); //for form validatio


// Get all items
const getAllItems = async (req, res) => {
    console.log("itemController getAllItems");
    try {
        const allItems = await itemService.getAllItems();
        res.send({ status: "OK", data: allItems });
    }catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }


};
 

// Create new item - C
const createNewItem = async (req, res) => {
    console.log("itemController createNewItem");
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
                        "Validation of the new item failed",
                        errors: result.errors 
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
        const createdItem = await itemService.createNewItem(newItem);
        res.status(201).send({ status: "OK", data: createdItem });
    }
    catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }

};



// Get one item - R
const getOneItem = async (req, res) => {
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
        const item = await itemService.getOneItem(itemId);
        res.send({ status: "OK", data: item });
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
};


// Update an Item - U
const updateOneItem = async (req, res) => {
    
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
        const updatedItem = await itemService.updateOneItem(itemId, changedItem);
        res.send({ status: "OK", data: updatedItem });
        } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
};


// Delete one item - D
const deleteOneItem = async (req, res) => {
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
        await itemService.deleteOneItem(itemId);
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