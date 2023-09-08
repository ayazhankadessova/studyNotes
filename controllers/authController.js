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
// @access Public - access token has expired
const refresh = asyncHandler(async (req, res) => {
  // do stuff
})
