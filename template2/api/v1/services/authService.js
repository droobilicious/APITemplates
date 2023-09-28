// In src/api/v1/services/authService.js
 
const authDB = require("../database/authDatabase");
const { v4: uuid } = require("uuid");
const crypto = require('crypto')
const passport = require('passport');






const passportCallback = function(err, userData, info){
  console.log("passportCallback");
  console.log("userdata: ", JSON.stringify(userData));
  //eror authenticating
  if (err) { 
      //send an error
      // return next(err);  
  }

  if (!userData) {    /*send an error */ }

  // Login Token Creation process
  //create token containing limited information from the user
  let payload = { 
      id: userData.id,
      username: userData.username
  };

  // Sign the token
  const tokenOptions ={
    algorithm: "aes-128-ctr",
    expiresIn:  "360m"
  }
  const signedJWT = jwt.sign(payload, PRIV_KEY,tokenOptions );
  const refreshToken = crypto.randomBytes( 64 ).toString('hex');

  // return user info and a token
  // not as res though probably
  res.json({ 
      success: true,
      message: 'Login Succeeded', 
      user: {'test' : 123},  //include user data and token here?
      token: signedJWT, 
      refreshToken
  });


  }; //end of passport authenticate

/* doLogin- C */
const doLogin = (creds) => {

  console.log("authService doLogin ", JSON.stringify(creds));


  /* first need to load passport strategies */
  //passport.authenticate('local', passportCallback )(req, res, next)
  


  //creatae the item or return an error
  try {
    //const createdItem = authDB.createNewItem(itemToInsert);
    passport.authenticate('local', passportCallback ); //this will call passport verify function

    return {test: 'test'};
    
  } catch (error) {
    throw error;
  }

};
 

/* Create a new Item - C */
const doSignUp = (newUser) => {
  console.log("authService doSignUp ", JSON.stringify(newUser));

  /* build new user
        in production we would
        - use a proper hashing mechanism e.g. crypto.pbkdf2()
        - use a salt/pepper
        
        crypto.pbkdf2()
  */

  const userToInsert= {
    id: uuid(),
    username: newUser.username,
    email: newUser.email,
    hashed_password:  crypto.createHash('md5').update(newUser.password).digest("hex"),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
 

  //create the item or return an error
  try {
    //create and return user
    // ** also return login token
    const createdUser = authDB.doSignUp(userToInsert);
    return createdUser;

  } catch (error) {
    throw error;
  }

};
 

 
/* Create a new Item - C */
const doTokenExchange = (token) => {
  console.log("authService doTokenExchange ", JSON.stringify(token));

  const itemToInsert = {
    ...newItem,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  //creatae the item or return an error
  try {
    const createdItem = itemDB.createNewItem(itemToInsert);
    return createdItem;
  } catch (error) {
    throw error;
  }

};
 

module.exports = {
  doLogin,
  doSignUp, 
  doTokenExchange, 
};