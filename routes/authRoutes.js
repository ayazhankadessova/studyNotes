const express = require('express')
const router = express.Router()
const limiter = require('../controllers/authController')

router.route('/').post(limiter)

router.route('/refresh').get()

router.route('/logout').post()

module.exports = router
