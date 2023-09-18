
require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt; // to help extract the token


const crypto = require('crypto');  // Used for creating and checking Hash
const db = require('../lib/db');


//Load keys
const fs = require('fs');
const PUB_KEY = fs.readFileSync( process.env.PUB_KEY_PATH , 'utf8');
const PRIV_KEY = fs.readFileSync( process.env.PRIV_KEY_PATH , 'utf8');







// authentication modules

/*
Local authentication strategy
- Authenticate a locally stored locally
*/

passport.use(new LocalStrategy(
    
    function verify(username, password, cb) {
      //console.log("LocalStrategy : Running");
      //console.log("Password: " , password);

      /* also get user authority - standard, admin etc */
      db.getSQL('SELECT * FROM users WHERE username = ?', [username], function(err, result){
        if (err){ return cb(err); } 
             
        else if  (!result.length) {   //incorrect username
          //console.log("No users found");
          return cb(null, false, { message: 'Incorrect username or password.' });
        } 
        else if (!result[0].id) { // null result error
            //console.log("Null result");
            return cb(null, false, { message: 'Unknown error.' });
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
                  return cb(err); 
              } //there was an error hashing the provided password
              
              //console.log("LocalStrategy : Hash created");

              //check provided password against user hashed_password
              if (!crypto.timingSafeEqual(userRow.hashed_password, hashedPassword)) {
                  //the hashes did not match
                 // console.log("LocalStrategy : Hashes did not match");
                  return cb(null, false, { message: 'Invalid username or password.' });
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
              return cb(null, userRow, {message: 'Logged In Successfully'} );  //the authentication was succesful.   
              //return cb(null, userRow); //, {message: 'Logged In Successfully'} );  //the authentication was succesful.   
              
          });  //end of crypto hash function

        } // end of "user is valid"

      }); //end of db connection


}) );  //end of addition of localstrat to middleware



/*
Web Token Strategy

- read token from request header
- validate token

  const passportJWTOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: PUB_KEY || secret phrase,
      issuer: 'enter issuer here',
      audience: 'enter audience here',
      algorithms: ['RS256'],
      ignoreExpiration: false,
      passReqToCallback: false,
      jsonWebTokenOptions: {
          complete: false,
          clockTolerance: '',
          maxAge: '2d', // 2 days
          clockTimestamp: '100',
          nonce: 'string here for OpenID'
      }
  }
*/



/*

JWT Strategy
The JWT payload is passed into the verify callback

token expiry is checked automatically

*/
//function verify(username, password, cb) {

/*
  - when the token empty, this callback function is not run.  Passports own function returns to the caller
  - when the token invalid, this callback function is not run.  Passports own function returns to the caller
  - 


  no auth token
  invalid token
  invalid signature

  valid:
  Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBbmR5IiwiaWF0IjoxNjkwOTEwNDY5LCJleHAiOjE2OTA5MzIwNjl9.pgOh_-eo7ITYBJi53HaJizVwV5z9MwSQyLIBtV_XCnMyTdmcia49kryUv7Nb6yzTKAeV44-QUbOWrHSMX4tqHbQm0RYhZVtJ6my4xIBsg1yDePl5X8TUVzQb-b1FhN8nsKcjEPaSDkYb23zETEVCUKv4GEyslbg2ZfG52_U1qrCgIXdlkcfqTzNfTjUfLBGjsZCfUpr2jay-pc9Co-3gtbiLnrimoIO35rND3NcZC3p05Fg3chDDGLW77Wiy5SfST6aDpfcgNoCa8JkdiEj_FRyEhloiOLFeoHmPNM0n_tJp9t4CpJyLmrX4KLaBReGKPngf4IqaKv3QZw-QIUH58g

  change in first group - invalid token
  Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6MSwidXNlcm5hbWUiOiJBbmR5IiwiaWF0IjoxNjkwOTEwNDY5LCJleHAiOjE2OTA5MzIwNjl9.pgOh_-eo7ITYBJi53HaJizVwV5z9MwSQyLIBtV_XCnMyTdmcia49kryUv7Nb6yzTKAeV44-QUbOWrHSMX4tqHbQm0RYhZVtJ6my4xIBsg1yDePl5X8TUVzQb-b1FhN8nsKcjEPaSDkYb23zETEVCUKv4GEyslbg2ZfG52_U1qrCgIXdlkcfqTzNfTjUfLBGjsZCfUpr2jay-pc9Co-3gtbiLnrimoIO35rND3NcZC3p05Fg3chDDGLW77Wiy5SfST6aDpfcgNoCa8JkdiEj_FRyEhloiOLFeoHmPNM0n_tJp9t4CpJyLmrX4KLaBReGKPngf4IqaKv3QZw-QIUH58g


  invalid Signature (changed 1 char in last group)
  Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBbmR5IiwiaWF0IjoxNjkwOTEwNDY5LCJleHAiOjE2OTA5MzIwNjl9.pgOh_-eo7ITYBJi53HaJizVwV5z9MwSQyLIBtV_XCnMyTdmcia49kryUv7Nb6yzTKAeV44-QUbOWrHSMX4tqHbQm0RYhZVtJ6my4xIBsg1yDePl5X8TUVzQb-b1FhN8nsKcjEPaSDkYb23zETEVCUKv4GEyslbg2ZfG52_U1qrCgIXdlkcfqTzNfTjUfLBGjsZCfUpr2jay-pc9Co-3gtbiLnrimoIO35rND3NcZC3p05Fg3chDDGLW77Wiy5SfST6aDpfcgNoCa8JkdiEj_FRyEhloiOLFeoHmPNM0n_tJp9t4CpJyLmrX4KLaBReGKPngf4IqaKv3QZw-QIUH58gc

  change in second group =  "Unexpected token | in JSON at position 59",
  Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBbmR5IiwiaWF0IjoxNjkwOTEwNDY5LCJleHAiOjE2OTA5MzIwNjl8.pgOh_-eo7ITYBJi53HaJizVwV5z9MwSQyLIBtV_XCnMyTdmcia49kryUv7Nb6yzTKAeV44-QUbOWrHSMX4tqHbQm0RYhZVtJ6my4xIBsg1yDePl5X8TUVzQb-b1FhN8nsKcjEPaSDkYb23zETEVCUKv4GEyslbg2ZfG52_U1qrCgIXdlkcfqTzNfTjUfLBGjsZCfUpr2jay-pc9Co-3gtbiLnrimoIO35rND3NcZC3p05Fg3chDDGLW77Wiy5SfST6aDpfcgNoCa8JkdiEj_FRyEhloiOLFeoHmPNM0n_tJp9t4CpJyLmrX4KLaBReGKPngf4IqaKv3QZw-QIUH58g


  Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJpZCI6MSwidXNlcm5hbWUiOiJBbmR5IiwiaWF0IjoxNjkwOTEwNDY5LCJleHAiOjE2OTA5MzIwNjl8.
        pgOh_-eo7ITYBJi53HaJizVwV5z9MwSQyLIBtV_XCnMyTdmcia49kryUv7Nb6yzTKAeV44-QUbOWrHSMX4tqHbQm0RYhZVtJ6my4xIBsg1yDePl5X8TUVzQb-b1FhN8nsKcjEPaSDkYb23zETEVCUKv4GEyslbg2ZfG52_U1qrCgIXdlkcfqTzNfTjUfLBGjsZCfUpr2jay-pc9Co-3gtbiLnrimoIO35rND3NcZC3p05Fg3chDDGLW77Wiy5SfST6aDpfcgNoCa8JkdiEj_FRyEhloiOLFeoHmPNM0n_tJp9t4CpJyLmrX4KLaBReGKPngf4IqaKv3QZw-QIUH58g


*/
passport.use( 
  new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  //get the JWT from the request
            secretOrKey: PUB_KEY//switch for asym key
            //secretOrKey: process.env.AUTH_SECRET_KEY //switch for asym key
         }, function verify(jwt_payload, next) {

       // console.log("JwtStrategy : Running");
       // console.log('JwtStrategy : Payload received : ', jwt_payload);
        

        let user = jwt_payload;
        //let user = getUser({ id: jwt_payload.id });
        /*
          Maybe actually verify this user exists too
          and assign any other properties if desired
        */

        if (user) {
          //console.log("Jwt Strategy success");

          next(null, user, {});

        } else {
          //console.log("JwtStrategy : User not found");
          //res.json({ msg: 'Not Authenticated'});
          next(null, false, {message : "Token error"});


        }
      }
    ) //end of JWT strategy
  ); //end of passport.use



 module.exports = passport
