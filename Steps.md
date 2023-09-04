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
- [x] Create new user w/ pwd hashing -> content-type: application/json
- [x] Update User
- [ ] Delete User -> cannot delete if user has assigned notes

5. Testing controllers

- Get All User:

  1. [x] No users - error
  2. [x] Pwd - not shown

- Create User:

  1. [x] Catches Duplicate username
  2. [x] Errors when not all fields input
  3. [x] Test AsyncHandler w/ unexpected Token

- Update User

  1. [x] User Not Found if id not correct
  2. [x] All fields are required if one field is missing
  3. [x] Update

- Delete User

  1. [x] User not found if id incorrect
  2. [x] User has assigned notes -> check when notes exist

### Done

```
1. In the `server.js` -> created route for the users
2. In the routes directory, created `userRoutes.js`
3. In the controllers directory, created the `usersControllers.js` that has all diff methods
```

6. Clean-ups/standartization

- [ ] Check if can log custom errors

## Do same for Note model

7. Note Router

- [x] Create Notes Router
- [x] Create Middleware for authentication
- [x] Attach user to the notes route
- [x] Create Note model
- [x] Create Controllers

## 5. Frontend: React.JS

1. Bootstrap

- [ ] Redux
- [ ] Redux File Structure

2. Router

- [x] Allows to have nested routes

```
<Route path='/*' element={<App />} />
```

- [x] Create components for routing (DashHeader, Outlet, DashFooter)
- [x] Create Outlet

```
An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered.
```

- [x] Create multiple routes

_This is starter_

```
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}></Route>
    </Routes>
  )
}
```

3. Create public facing page -> `Public.js`

- [x] Create Routes

```
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* default component */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  )
}
```

4. Finish Hierarchy of the application

- [x] Work on components for routing (DashHeader, Outlet, DashFooter)
- [x] /dash -> welcome component
- [x] /dash/notes -> noteslist
- [x] /dash/users - usersList component
- [x] Work on features (Auth, NotesList, UsersList)
- [x] Basic Layout and structure for our application next, we will be managing state with Redux and applying the API layer with rtk query

## 6. Redux & RTK Query

1. Get dependencies

> npm i @reduxjs/toolkit react-redux

2. Make `app` -> `api` -> `apiSlice`
3. Make `store.js`(Global Truth of States)
4. Add `apiSlice` as reducer in `store.js`
5. Provide `Store` to the application via adding `Provider` in `index.js`

```
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
```

6. `UsersApiSlice`
7. normalize

```
// we have already set localhost:3500 as base, now we just add the endpoints -> getUsers
// Validate status
// Transform
// return userAdapter
// returns the query result object
// creates memoized selector
// pass result
//getSelectors creates these selectors and we rename them with aliases using destructuring
// Pass in a selector that returns the users slice of state
```

8. `NotesApiSlice`
9. `UsersList`
10. Get users using query-> destructure -> use grid table
11. Create user component
12. Dispatching an action means sending it to the store, which then passes it to the reducers. Reducers examine the action type and perform the necessary state updates.
    educers give new state. When the state in the Redux store changes, the connected React components receive the updated data as props. They can then use that data to update their own UI and rerender if necessary.
13. 'user.js -> table row
14. import user to userlist
15. Do same for `NotesList`

## 7. React & Redux Forms

1. Add other endpoints in `usersApiSlice` : `addNewUser`, `updateUser` using mutation
2. invalidate

```
This means that you can set up your API so that firing a particular mutation will cause a specific query endpoint to consider its cached data invalid. Then, it will re-fetch the data if there is an active subscription. This helps ensure that your app always displays the most up-to-date information.
```

3. Add endpoints to `notesApiSlice`
4. Add User placeholder components : `EditUser.js`, `NewUserForm.js`
5. Add Notes placeholder components : `EditNote.js`, `NewNote.js`

- so that we can do routing inside the `App.js`

6. Add routes to `App.js`

```
<Route path='users'>
  <Route index element={<UsersList />} />
  <Route path=':id' element={<EditUser />} />
  <Route path='new' element={<NewUserForm />} />
</Route>

{/* will add new note component, create note compinent, etc */}
<Route path='notes'>
  <Route index element={<NotesList />} />
  <Route path=':id' element={<EditNote />} />
  <Route path='new' element={<NewNote />} />
</Route>
```

7. Create `config` dir in src

- we can export & use it in other files we need

8. `NewUserForm.js` -> not public facing form, but for managers/owners -> not as strict

_manages states and validate input_

> AddNewUser -> can use, not activated immediately

- [x] Specify starter states & defaults
- [x] Validate Username & password
- [x] if validation is success, make everything blank again and navigate to `dash/users`
- [x] add handlers -> setUsername & pwd
- [x] add onRolesChanged
- [x] check if we can save. All of these methods should be true. If not loading -> can save
- [x] onSaveUserClicked -> add new User mutation
- [x] creating an option for every value in roles for the dropdown menu
- [x] checking which class will be applied for the inputs -> error ones is error
- [x] display error messages on the top if errors occur
- [x] onSaveUserClicked -> for the entire form
- [x] if we dont meet requirements for saving the new user, we are disabling this button
- [x] label for each input
- [x] multiple=true -> can select more than one value

9. Create `EditUser.js`

```
// get user id out of the url
// get user data from the state, not query
// we created useSelector in the userApiSlice
// if we have a user, pull the edit user form that we have not created yet
```

10. Create `EditUserForm`

- [x] Generally, very similar to `NewUserForm`, but uses `UpdateUser` & `DeleteUser` mutations.
- [x] Has disable employee option
- [x] Validate username & password
- [x] Check if functions are successful (upd, del)
- [x] handlers
- [x] Add onClicked changes
- [x] Check if we can save
- [x] Check for update/del error
- [x] Add Save & Del buttons -> They cann mutations
- [x] Add Active / not active buttons
- [x] Other fields are same

---

## Fixes

1. Transfer pre-save hash password to User Schema
2. [ ] Add `test.https`
3. [ ] Add redux

## Learned

1. Optional chaining

> if (!users?.length) 2. Route element

- <Route> elements may be nested to indicate nested UI, which also correspond to nested URL paths. Parent routes render their child routes by rendering an <Outlet> .
- Element helps associate path with UI.

2. Nested Routes in React.js

> https://www.geeksforgeeks.org/implement-nested-routes-in-react-js-react-router-dom-v6/

3. Time Zones Database: https://www.iana.org/time-zones
4. Redux: https://www.freecodecamp.org/news/what-is-redux-store-actions-reducers-explained/

- Relies on the single immutable object to store all the application's state.
- Dispatch -> action -> payload has the data that it wants to be changed -> reducer function
- First make global store object
- Provide the Stories
- Pizza Slice (initial state) + Reducer logic (take the old state+ define logic required to change the state)
- We can use reducer in UI component
- Select state anywhere w/o content
- useDispatch() -> to change application data -> sends action name and data payload on normal browser events, like a button click
- serve application & install the redux dev tool browser extension (inspect & debug)

5. Redux Registration: https://medium.com/@jebasuthan/react-user-registration-and-login-using-redux-81ec739e93d1
