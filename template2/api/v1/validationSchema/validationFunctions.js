
/*
Custom validation functions.

How do these return asynchronously?

*/


const checkUsernameOkToUse = (username) => {
   //console.log("checkUsernameOkToUse run. ", JSON.stringify(username));
   


   let query =  `SELECT count(*) As count FROM users WHERE username = ?`;
   let params = [ username  ];
 
   return new Promise((resolve, reject) => {
 
     db.getSQL(query, params, function(err, result){
       if (err){ 
         reject(); //if error then assume the name exists and fail validation
       }    
       else{
   
           //console.log( "results: ", JSON.stringify(result[0]));
           if (result[0].count > 0)
           {
             reject();   //username is in use
           }else{
             resolve();
           }
 
       }
   
   
     }); //end of query
 
   });
 
 
 }
 
 const checkEmailOkToUse = (email) => {
 
  //console.log("checkEmailOkToUse run. ", JSON.stringify(email));
 
   let query =  `SELECT count(*) As count FROM users WHERE email = ?`;
   let params = [ email  ];
 
   return new Promise((resolve, reject) => {
 
     db.getSQL(query, params, function(err, result){
       if (err){ 
         reject(); //if error then assume the name exists and fail validation
       }    
       else{
           //console.log( "results: ", JSON.stringify(result[0]));
           if (result[0].count > 0)
           {
             reject(); //username is in use
           }else{
             resolve();
           }
       }
 
     }); //end of query
 
   });
 
 }