 


 module.exports =  {
   username: {
     trim: true,
     notEmpty: {
         bail: true, 
         errorMessage: 'Username cannot be empty'
     },
     isLength: { 
       options: { min: process.env.USERNAME_MIN_LENGTH },
       bail: true, 
       errorMessage: 'Username is too short'
     },
     matches: { 
         options: /^(?=.{4,20}$)(?![_])(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_])$/,
         errorMessage: 'Username does not match format'
     },
     custom: { 
       options: checkUsernameOkToUse,
       errorMessage: 'This username is already in use'
     }
   },
   email: { 
     trim: true,
     isEmail: { 
       bail: true, 
       errorMessage: 'Not a valid email'
     },
     custom: { 
         options: checkEmailOkToUse,
         errorMessage: 'This email is already in use'
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