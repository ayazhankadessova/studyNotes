const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  )
  console.log(err.stack)

  const status = res.statusCode ? res.statusCode : 500 // server error

  res.status(status)

  res.json({ message: err.message })
}

module.exports = errorHandler

// const { CustomAPIError } = require('../errors')
// const { StatusCodes } = require('http-status-codes')
// const errorHandlerMiddleware = (err, req, res, next) => {
//   let customError = {
//     // default

//     statusCode:
//       errorHandlerMiddleware.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//     msg: err.message || 'Something went wrong. Try again later.',
//   }

//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message })
//   }

//   if (err.name === 'ValidationError') {
//     console.log(Object.values(err.errors))
//     customError.msg = Object.values(err.errors)
//       .map((item) => item.message)
//       .join(', and ')
//     customError.statusCode = StatusCodes.BAD_REQUEST
//   }

//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id: ${err.value}`
//     customError.statusCode = StatusCodes.NOT_FOUND
//   }
//   if (err.code && err.code === 11000) {
//     customError.msg = `Duplicate value entered for ${Object.keys(
//       err.keyValue
//     )} field, please choose another value.`
//     customError.statusCode = StatusCodes.BAD_REQUEST
//   }

//   // testing the error code, name & message
//   // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })

//   // make it more user-friendly by removing not-needed things
//   return res.status(customError.statusCode).json({ msg: customError.msg })
// }

// module.exports = errorHandlerMiddleware
