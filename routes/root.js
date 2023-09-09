const express = require('express')
const router = express.Router()
const path = require('path')

// look into the views folder & look at the index.html file
router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router
