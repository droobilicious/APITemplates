
require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');  // Used for creating and checking Hash



const userService = require("../services/userService");


passport.use(
   new LocalStrategy(
    
   function verify(username, password, callback) {
     console.log("LocalStrategy : Running");
     console.log("username: " , username);
     console.log("password: " , password);

     /* also get user authority - standard, admin etc */

     authDB.getUserByUsername()

     db.getSQL('SELECT * FROM users WHERE username = ?', [username], function(err, result){
       if (err){ return cb(err); } 
            
       else if  (!result.length) {   //incorrect username
         //console.log("No users found");
         return callback(null, false, { message: 'Incorrect username or password.' });
       } 
       else if (!result[0].id) { // null result error
           //console.log("Null result");
           return callback(null, false, { message: 'Unknown error.' });
       }
       else {
         //username is valid
        // console.log("LocalStrategy : Username is valid");
         let userRow = result[0];

         //get hash of provided password
         crypto.pbkdf2(password, 
                       userRow.salt, 
                       parseInt(process.env.AUTH_HASH_ITERATIONS), 
                       parseInt(process.env.AUTH_HASH_KEYLENGTH), 
                       process.env.AUTH_HASH_DIGEST, 
                       function(err, hashedPassword) {

             if (err) { 
                 //console.log("LocalStrategy : Hasing error");
                 return callback(err); 
             } //there was an error hashing the provided password
             
             //console.log("LocalStrategy : Hash created");

             //check provided password against user hashed_password
             if (!crypto.timingSafeEqual(userRow.hashed_password, hashedPassword)) {
                 //the hashes did not match
                // console.log("LocalStrategy : Hashes did not match");
                 return callback(null, false, { message: 'Invalid username or password.' });
             }
     
             //console.log("LocalStrategy : Authentication success");
             //console.log("LocalStrategy : userRow: " +  JSON.stringify(userRow) );

             // no need to return the full user here
             /*
             let user = {
                 id: userRow.id,
                 username: userRow.username
             }
             console.log(" user: " +  JSON.stringify(user) );
             */
             return callback(null, userRow, {message: 'Logged In Successfully'} );  //the authentication was succesful.   
             //return cb(null, userRow); //, {message: 'Logged In Successfully'} );  //the authentication was succesful.   
             
         });  //end of crypto hash function

       } // end of "user is valid"

     }); //end of db connection


}) );  //end of addition of localstrat to middleware
