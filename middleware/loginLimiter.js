const rateLimit = require('express-rate-limit')

const { logEvents } = require('./logger')

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute (60 * 1000 miseconds)
  max: 5, // Limit each IP to 5 login requests per `window` (here, per 1 minute)
  message: {
    message: 'Too many attempts from this IP, please try again after a minute',
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'errLog.log'
    ) // written in error log
    res.status(options.statusCode).send(options.message)
  },

  standardHeaders: true, // RateLimit headers
  legacyHeaders: false, // X-RateLimit-* headers
  // store: ... , // Use an external store for more precise rate limiting
})

module.exports = limiter
