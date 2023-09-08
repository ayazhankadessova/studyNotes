const express = require('express')
const router = express.Router()
// const {
// } = require('../controllers/authController')

router.route('/').post()

router.route('/refresh').get()

router.route('/logout').post()

module.exports = router
