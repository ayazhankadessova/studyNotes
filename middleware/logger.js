const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

// use tabs so it is easier to import logs in the Excel or smth similar
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(2014, 1, 11), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    // create a directory of it does not exist
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fs.promises.mkdir(path.join(__dirname, '..', 'logs'))
    }

    // append LogItem to the log file

    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem
    )
  } catch (err) {
    console.log(err)
  }
}

// logs every request that comes in
// Add conditionals
const loggerMiddleware = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, `reqLog.log`)
  console.log(`${req.method}\t${req.path}`)

  // go to the next middleware
  next()
}

module.exports = { logEvents, loggerMiddleware }

// const app = express()
// const winston = require('winston')
// const consoleTransport = new winston.transports.Console()
// const myWinstonOptions = { transports: [consoleTransport] }
// const logger = new winston.createLogger(myWinstonOptions)
// function logRequest(req, res, next) {
//   logger.info(req.url)
//   next()
// }
// app.use(logRequest)
// function logError(err, req, res, next) {
//   logger.error(err)
//   next()
// }
// app.use(logError)
