

# Sources
- https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/#name-resources-in-plural
- https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

# Features
[x] CRUD operations on 2 endpoints
[x] Layred architecture
[x] CORS
[x] API Versioning
[x] Standard error handling
[x] Version sepcific error handlers
[ ] database with sqllite
[ ] async requests to database
    - https://blog.pagesd.info/2019/10/29/use-sqlite-node-async-await/
[ ] authentication with passport
   - create strategies
   - use strategies to authenticate
   - local and JWT
[ ] JWT access tokens
[ ] authorization.  Apply at route level but also maybe at a lower level.  e.g. an Item that can only be viewed by a certain user.   Or maybe that's a 2nd layer of authorization
[ ] passport strategies
[ ] validation schema 
   - applied at route level?
   - maybe  ORM model will do some validation in later versions
[ ] cross over endpoints?  Scoping of nested endpoints?
[ ] generic route/controller/service?
[ ] unit testing  Mocha and Chai


next version?
[ ] Integrate filtering, sorting & pagination
[ ] ORM

[ ] inline-documentation
   - APIDOC
   - Swagger



# Info
- Anything below Controller returns an error with Throw() and then the controller turns that into a json response
- Database layer is just manipulation of json in this example
- Layers
   - Routes - handle directing the request to a controller
   - Controller 
      - parses details from request and does validation
      - no HTTP activity lower than this layer
      - wraps error from further down the stack in an appropriate JSON response
      - each controller returns either an OK status with the result, or an ERROR status with error details
   - Service 
      - The business logic, exports methods that are used by the controller
   - Data Access Layer 
      - used by the service layer to interact with the database


- Modules used
   - cors  - Cross Origin Resource Sharing
   - dotenv  - Config management
   - express  - web server
   - uuid  - create unique IDs for items
   - express-validator  - validation of forms
   - crypto    - used for creating and comparing hashes
   - passport - authentication module
   - nodemon (dev only)  - monitor and restart server on changes

- At 