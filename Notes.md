## Logging

- Why logs?

Operations engineers and developers use logs for debugging. Product managers and UX designers use logs for planning and design. Marketers want to track the performance of various features that relate to advertising campaigns.

1. Exceptions ("error" and "warn) -> `stderr`
2. Information ("log" and "info") -> `stdout` | major events, logging messages to other developers
3. Debugging (“debug” and “verbose”) -> `stack traces`, `input` and `output` parameters.

https://betterstack.com/community/guides/logging/how-to-start-logging-with-node-js/

https://www.google.com/search?client=safari&rls=en&q=sample+logger.js&ie=UTF-8&oe=UTF-8

- Packages

1. winston

https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/

```
const app = express()
const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = { transports: [consoleTransport] }
const logger = new winston.createLogger(myWinstonOptions)
function logRequest(req, res, next) {
  logger.info(req.url)
  next()
}
app.use(logRequest)
function logError(err, req, res, next) {
  logger.error(err)
  next()
}
app.use(logError)
```

```
{"level":"info","message":"/ayash-GET"}
{"level":"info","message":"/css/style.css-GET"}
```
