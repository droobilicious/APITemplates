module.exports =  {
   username: {
      trim: true,
      notEmpty: {
          bail: true, 
          errorMessage: 'Name cannot be empty'
      }
   },
   password: {
      trim: true,
      notEmpty: {
          bail: true, 
          errorMessage: 'Password cannot be empty'
      }
   }

}