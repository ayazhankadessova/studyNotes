const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const { BadRequestError, NotFoundError } = require('../errors')
const { response } = require('express')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  // do stuff
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - access token has expired , the only way to have new access token is using refresh

const refresh = asyncHandler(async (req, res) => {
  // do stuff
})

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {}

module.exports = {
  login,
  refresh,
  logout,
}
