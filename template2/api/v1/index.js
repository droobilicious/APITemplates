// In src/api/v1/index.js
 
const express = require("express");
const router = express.Router();

const routes = require("./routes/");

router.use("/auth", routes.authRoutes);
router.use("/users", routes.userRoutes);
router.use("/items", routes.itemRoutes);
router.use("/tags", routes.tagRoutes);

/* handle route not found error */ 
router.use("/", (req, res, next) => {
  res.status(404).send( { status: "ERROR", message: 'V1 Endpoint not found' } );
});

/* handle general error */ 
/* not running currently */
router.use((err, req, res, next) => {
  console.log("V1 API error handler error handler. Status:", err.status);
  
  // render the error page
  // TODO: use json response here?
  res.status(err.status || 500);
  res.send( 'There was an error (v1). Status: ' + err.status );

});



module.exports = router;