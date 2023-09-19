module.exports =  {
   name: {
      trim: true,
      notEmpty: {
          bail: true, 
          errorMessage: 'Name cannot be empty'
      }
   }

}