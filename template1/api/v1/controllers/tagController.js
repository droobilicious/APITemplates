// In src/api/v1/controllers/tagController.js

const tagService = require("../services/tagService");


// Get all tags
const getAllTags = (req, res) => {
   console.log("tagController getAllTags");
   try {
      const allTags = tagService.getAllTags();
      res.send({ status: "OK", data: allTags });
   }catch (error) {
      res
         .status(error?.status || 500)
         .send({ status: "FAILED", data: { error: error?.message || error } });
   }


};


// Create new tag - C
const createNewTag = (req, res) => {
   console.log("tagController createNewTag");
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
                     "Validation of the new tag failed",
                  },
               }
         );
      return;
   }

   // validation passed
   
   //create new tag
   const newTag = {
      name: body.name,
      owner_id: body.owner_id
   };

   // create the tag or return an error
   try {
      const createdTag = tagService.createNewTag(newTag);
      res.status(201).send({ status: "OK", data: createdTag });
   }
   catch (error) {
      res
         .status(error?.status || 500)
         .send({ status: "FAILED", data: { error: error?.message || error } });
   }

};



// Get one tag - R
    const getOneTag = (req, res) => {
        console.log("tagController getOneTag");
        const {
            params: { tagId },
        } = req;
        
        if (!tagId) {
            res
            .status(400)
            .send({
              status: "FAILED",
              data: { error: "Parameter ':tagId' cannot be empty" },
            });
        }

        try {
            const tag = tagService.getOneTag(tagId);
            res.send({ status: "OK", data: tag });
        }
        catch (error) {
            res
              .status(error?.status || 500)
              .send({ status: "FAILED", data: { error: error?.message || error } });
          }
    };
    

// Update an Tag - U
    const updateOneTag = (req, res) => {
        
        console.log("tagController updateOneTag");
        const {
            body,
            params: { tagId },
          } = req;

          if (!tagId) {
            res
              .status(400)
              .send({
                status: "FAILED",
                data: { error: "Parameter ':tagId' cannot be empty" },
              });
          }

          // validation?

          // build tag
          const changedTag = body;

          // Update Tag
          try {
            const updatedTag = tagService.updateOneTag(tagId, changedTag);
            res.send({ status: "OK", data: updatedTag });
          } catch (error) {
            res
              .status(error?.status || 500)
              .send({ status: "FAILED", data: { error: error?.message || error } });
          }
    };
 

// Delete one tag - D
    const deleteOneTag = (req, res) => {
        console.log("tagController deleteOneTag");
        const {
            params: { tagId },
          } = req;

        if (!tagId) {
            res
                .status(400)
                .send({
                status: "FAILED",
                data: { error: "Parameter ':tagId' can not be empty" },
                });
        }

        //delete tag
        try {
            console.log("Trying to delete");
            tagService.deleteOneTag(tagId);
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
    getAllTags,
    createNewTag, // C
    getOneTag,    // R
    updateOneTag, // U
    deleteOneTag, // D
};