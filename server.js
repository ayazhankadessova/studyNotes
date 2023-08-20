const express = require('express')
const app = express()

const PORT = process.env.PORT || 3500

app.get('/', (req, res) => {
  res.send('<h1>Study Notes</h1><a href="/api-docs">Documentation</a>')
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
