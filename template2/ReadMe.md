

# Features
[x] CRUD operations on 2 endpoints
[x] Layred architecture
[x] CORS
[x] API Versioning
[x] Standard error handling
[x] Version sepcific error handlers
[ ] authentication
[ ] JWT access tokens
[ ] authorization.  Apply at route level but also maybe at a lower level.  e.g. an Item that can only be viewed by a certain user.   Or maybe that's a 2nd layer of authorization
[ ] passport strategies
[ ] validation schema 
   - applied at route level?
   - maybe  ORM model will do some validation in later versions
[ ] async database
[ ] cross over endpoints?  Scoping of nested endpoints?

next version?
[ ] Integrate filtering, sorting & pagination



# Info
- Anything below Controller returns an error with Throw() and then the controller turns that into a json response
- Database layer is just manipulation of json in this example
- Layers
   - Routes - handle directing the request to a controller
   - Controller 
      - parses details from request and does validation
      - no HTTP activity lower than this layer
   - Service - The business logic, exports methods that are used by the controller
   - Data Access Layer -  used by the service layer to interact with the database
- Modules used
   - cors
   - dotenv
   - express
   - uuid
   - nodemon (dev only)
- At 