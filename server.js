require('dotenv').config()

const express = require('express')
const app = express()

// connect db
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')

const path = require('path')
const { loggerMiddleware } = require('./middleware/logger')
const errorHandlerMiddleware = require('./middleware/error-handler')
const cookieParser = require('cookie-parser')

// security packages
const helmet = require('helmet')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const PORT = process.env.PORT || 3500

//logger comed before everything else
app.use(loggerMiddleware)

// // security packages
// app.set('trust proxy', 1)
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// )

// let app process json: receive & parse json data
app.use(express.json())
app.use(helmet())
// make it available to the public
// app.use(cors())
app.use(cors(corsOptions))
app.use(xss())

app.use(cookieParser())

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

app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    )
  } catch (error) {
    console.log(error)
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      'mongoErrLog.log'
    )
  }
}

start()

// connectDB()
// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB')
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// })

// mongoose.connection.on('error', (err) => {
//   console.log(err)
//   logEvents(
//     `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
//     'mongoErrLog.log'
//   )
// })
