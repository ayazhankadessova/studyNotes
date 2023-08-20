const express = require('express')
const app = express()

const path = require('path')

const { loggerMiddleware } = require('./middleware/logger')

const PORT = process.env.PORT || 3500

//logger comed before everything else
app.use(loggerMiddleware)

// let app process json: receive & parse json data
app.use(express.json())

const router = require('./routes/root')

// use public folder
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', router)

// for errors, catch-all that goes at the very end
// for requests that were not routed properly
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

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
