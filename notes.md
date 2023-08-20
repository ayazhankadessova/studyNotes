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
