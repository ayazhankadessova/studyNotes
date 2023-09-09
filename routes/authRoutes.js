const express = require('express')
const router = express.Router()
const limiter = require('../middleware/loginLimiter')

const { login, refresh, logout } = require('../controllers/authController')

router.route('/').post(limiter, login)

router.route('/refresh').get(refresh)

router.route('/logout').post(logout)

module.exports = router
