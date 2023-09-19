 


 module.exports =  {
   username: {
     trim: true,
     notEmpty: {
         bail: true, 
         errorMessage: 'Username cannot be empty'
     },
     isLength: { 
       options: { min: 4 },
       bail: true, 
       errorMessage: 'Username is too short'
     },
     matches: { 
         options: /^(?=.{4,20}$)(?![_])(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_])$/,
         errorMessage: 'Username does not match format'
     }
   },
   email: { 
     trim: true,
     isEmail: { 
       bail: true, 
       errorMessage: 'Not a valid email'
     }
   },
   password: { 
     trim: true,
     isLength: { 
         options: { min: 8 } 
       } 
   },
   confirmpassword: {
     custom: {
       if: (confPass, { req }) => confPass !== req.body.password,
       errorMessage: 'Confirm password did not match'
     }
   }
 }