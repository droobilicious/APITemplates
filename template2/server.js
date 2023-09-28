// server.js

const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");

//import models from './models';


const app = express();
const port = parseInt(process.env.SERVER_PORT); //normalizePort(process.env.PORT || '3000'); 
const host = process.env.SERVER_IP; //'0.0.0.0';

/* 
MIDDLEWARE
*/
app.use(cors());
app.use(express.json()); // parse Content-Type: application/json
app.use(express.urlencoded({ extended: true }));  // parse ‘content-type: application/x-www-form-urlencoded’  with body e.g. {“name”:”GeeksforGeeks”}, 


/* passport */
const passportStrategies = require('./api/v1/authenticationStrategies/localStrategy.js'); 
//app.use( passportStrategies.initialize() );  //passport authentication strategies
  




/* custom middleware */
app.use((req, res, next) => {
  /*
  req.context = {
    models,
    me: models.users[1],
  };*/
 
  next();
});
 


/* 
ROUTES 
*/
const v1routes = require("./api/v1");
app.use("/api/v1/", v1routes);


 
/*
ERROR ROUTES
*/

app.use((req, res, next) => {
  console.log("404 error handler hit");
  next();
});

app.use(function(err, req, res, next) {
  console.log("Generic error handler hit");
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send( 'There was an error. Status: ' + err.status );

});



/*
SERVER ACTIVATION
*/

app.listen(port, host, () => {
  console.log(`Listening to requests on http://${host}:${port}`);
});


