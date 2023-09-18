// In src/database/utils.js
const fs = require("fs");
const path = require("path");

const saveToDatabase = (DB) => {
  console.log("Utils saveToDatabase");
  //console.log("Utils saveToDatabase: DB", JSON.stringify(DB));
  /* shouldn't use Sync in real life */
  try{
    fs.writeFileSync( 
        path.join(__dirname, "/db.json"), 
        JSON.stringify(DB, null, 2), 
        { encoding: "utf-8",}
      );
  }
  catch(err){
    console.log("Utils saveToDatabase: Error writing file: ", err);
    return
  }
  console.log("Utils saveToDatabase: Success");
};

module.exports = { saveToDatabase };