var sqlite3 = require('sqlite3').verbose()
const crypto = require('crypto');  // Used for creating and checking Hash
const DBSOURCE = "./db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {

    if (err) {
      // Cannot open database
      console.error(err.message)

      //this needs to feed back to API response.

      throw err


    }
    else{
        console.log('Connected to the SQLite database.')
      
        // user table
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text UNIQUE, 
            email text UNIQUE, 
            hashed_password text, 
            createdAt DEFAULT CURRENT_TIMESTAMP,
            updatedAt DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT email_unique UNIQUE (email),
            CONSTRAINT username_unique UNIQUE (username)
            )`,
        (err) => {
            if (err) {
                // Table already created
               // console.log("Error users", err);
                
            }else{
                // Table just created, creating some rows
               // console.log("Inserting into users");

                var insert = 'INSERT INTO users (username, email, hashed_password) VALUES (?,?,?)'
                db.run(insert, ["user1", "user1@mail.com", crypto.createHash('md5').update('password1').digest("hex")]);
                db.run(insert, ["user2", "user2@mail.com", crypto.createHash('md5').update('password1').digest("hex")]);
                db.run(insert, ["user3", "user3@mail.com", crypto.createHash('md5').update('password1').digest("hex")]);
                
            }
        });  



        

        // Items
        db.run(`CREATE TABLE items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE, 
            owner_id INT, 
            createdAt DEFAULT CURRENT_TIMESTAMP,
            updatedAt DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT name_unique UNIQUE (name)
            )`,
        (err) => {
            if (err) {
                // Table already created
               // console.log("Error items", err);
            }else{
                // Table just created, creating some rows
                //console.log("Inserting into items");

                var insert = 'INSERT INTO items (name, owner_id) VALUES (?,?)'
                db.run(insert, ["item1", 1]);
                db.run(insert, ["item2", 1]);
                db.run(insert, ["item3", 1]);
                db.run(insert, ["item4", 2]);
                db.run(insert, ["item5", 2]);
                db.run(insert, ["item6", 2]);
                db.run(insert, ["item7", 3]);
                db.run(insert, ["item8", 3]);
                db.run(insert, ["item9", 1]);
                db.run(insert, ["item10", 3]);
            }
        });  



      //tags
      db.run(`CREATE TABLE tags (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name text UNIQUE,
         createdAt DEFAULT CURRENT_TIMESTAMP,
         updatedAt DEFAULT CURRENT_TIMESTAMP,
         CONSTRAINT name_unique UNIQUE (name)
         )`,
     (err) => {
         if (err) {
             // Table already created
            // console.log("Error", err);

         }else{
             // Table just created, creating some rows
            // console.log("Inserting into tags");

             var insert = 'INSERT INTO tags (name) VALUES (?)'
             db.run(insert, ["tag1"]);
             db.run(insert, ["tag2"]);
             db.run(insert, ["tag3"]);
             db.run(insert, ["tag4"]);
             db.run(insert, ["tag5"]);
 
         }
     });  


     //tags_to_items
      //tags
      db.run(`CREATE TABLE tags_to_items (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         item_id INT NOT NULL,
         tag_id INT NOT NULL,
         createdAt DEFAULT CURRENT_TIMESTAMP
         )`,
     (err) => {
         if (err) {
             // Table already created
            // console.log("Error tags_to_items", err);
         }else{
             // Table just created, creating some rows
            // console.log("Inserting into tags_to_items");

             var insert = 'INSERT INTO tags_to_items (item_id, tag_id) VALUES (?,?)'
             db.run(insert, [1,1]);
             db.run(insert, [1,2]);
             db.run(insert, [2,3]);
             db.run(insert, [3,4]);
             db.run(insert, [4,5]);
             db.run(insert, [5,1]);
             db.run(insert, [6,2]);
             db.run(insert, [7,3]);
             db.run(insert, [8,4]);
             db.run(insert, [9,5]);

 
         }
     });  


    }
});



/*
run a query asynchronously using promises to allow asyc/await functions
*/
db.queryByPromise = function (sql, params) {

   return new Promise( (resolve, reject) => {

       this.all(sql, params, function (error, data) {
           if (error){ reject(error);  }
           resolve(data);
       });
       
   });

};


/*
Wrap promise query in try/catch to always return a deconstructable output in the format  [data, error] 
*/
db.query = async (sql, params) => {
   
   try{
       const data = await db.queryByPromise(sql, params);
       return [data, null];
   }catch(error){
       console.log("wrapper error");
       return [null, error]
   }

};
 

module.exports = db