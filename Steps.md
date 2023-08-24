# Bootstrap, REST Api

- Set up server, routes, catch-all for errors.

1. Init npm

> npm init

2. Bootstrap `server.js`
3. Create `public` folder, add `css` folder
4. `router.get` gets the `index.html` file if it matches any of the three: => 1) could request just the slash 2) just the slash index 3) full slash index.html
5. Create `views` folder, `index.html` page
6. Catch all the errors -> `views` folder, `404.html` page

```
// for errors, catch-all that goes at the very end
app.all('*', (req, res) => {
  res.status(404)

  // check request headers
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})
```

## Middleware

- One or more functions that are placed in the path of requests that are received by our backend API.
- Middleware adds: 1) Additional Functionality for the API 2) Preliminary Request Processing before they get into the controller where the request processing will be completed.
- Middleware functions have access to the request and response objects, and they can modify these objects, add additional data, or perform various operations. Some common tasks performed by middleware include logging, authentication, data parsing, error handling, and routing.
- In the last project, I authenticated using middleware and then passed to the controller with userId attached.

- We will be adding 3 Types of Middleware:

1. Built-in

- Tells app where to get the static files

```
app.use('/', express.static(path.join(__dirname, 'public')))
```

```
// let app process json: receive & parse json data
app.use(express.json())
```

2. Custom
3. Third-party

- HTTP Request -> Middleware Functions -> API Response

# 2. Create middleware

1. Create `middleware`, `logs` folder
2. Add `logger` middleware and `error-handler` middleware
3. Add cookie parser

```
const cookieParser = require('cookie-parser')
```

4. Make api available to the public: `cors`
5. Add security:

> config folder -> allowedOrigins.js -> add local hosts that we would accept to access our REST API
> config folder -> corsOptions.js

6. test with fetch('localhost:3500')
7. check out `errLog.log` -> has been blocked by CORS policy

# 3. MongoDB

1. Install `dotenv`
2. Create a project + cluster in MongoDB
3. add `MONGO_URI` to `.env`
4. Create userModel based on UserStories
5. Create NodeModel
6. Add `mongoose-sequence`
7. Add MongoDB connection

```
noteSchema.plugin(AutoIncrement, {
  // name our incr field, will be added to schema
  inc_filed: 'ticket',
  // sep collection called counter will be created
  id: 'ticketNums',
  start_seq: 500,
})
```

## 4. Controllers

1. Add `userRoutes` route
2. Add `Controllers` folder
3. Bootstrap `usersController.js` with needed controllers

- Highlight `(` -> CMD + D + CMD+V

4. Add controllers to routes

- [x] Get All Users
- [x] Create new user w/ pwd hashing
- [x] Update User

5. Clean-ups/standartization

- [ ] Check if can log custom errors

---

## Fixes

1. Transfer pre-save hash password to User Schema
