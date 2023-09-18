


Standard API template

Sources:
https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/



# Info
- Layers
   - Routes - handle directing the request to a controller
   - Controller - parses details from request and does validation
   - Service - The business logic, exports methods that are used by the controller
   - Data Access Layer -  used by the service layer to interact with the database
- Anything below Controller returns an error with Throw() and then the controller turns that into a json response





# testring

## Get items
Invoke-RestMethod -Uri ($BasePath + "items") -Method GET | Select -expand data

## Get Tags
Invoke-RestMethod -Uri ($BasePath + "tags") -Method GET | Select -expand data

## Test 404
Invoke-RestMethod -Uri ($BasePath + "doesntexist") -Method GET 


## Test create item
$Item = @{"name"="NewItem1"}
Invoke-RestMethod -Uri ($BasePath + "items") -Method POST -Body ($Item |ConvertTo-Json) | Select -expand data




# Todo
- make db write async just to see how to handle the process with a callback
- create api with form-validator module  (they will have to be inserted in the controllers but can probably be stored as schema in their own folder)
- create api including passport authentication and jwt (with versioning)
- have endpoints for /items,  user/[userid]/items, and me/items   and have them scoped correctly