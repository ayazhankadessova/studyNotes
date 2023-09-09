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
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError('Please enter a valid username & a password')
  }

  const loginUser = await User.findOne({ username }).exec()

  if (!loginUser || !loginUser.active) {
    throw new UnauthenticatedError('Unauthorized.')
  }

  // compare password
  const isPasswordMatch = await loginUser.comparePassword(password)

  if (!isPasswordMatch) {
    throw new UnauthenticatedError('Incorrect Password.')
  }

  // create a token
  const accessToken = loginUser.createAccessToken()
  const refreshToken = loginUser.createRefreshToken()

  // create secure cookie with refresh token
  // when react hits refresh -> send cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // accessible only by user web server
    secure: true, // https
    sameSite: 'None', // cross site cookie , diff servers ok
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: 7 days
  })

  // send access Token w/ username + roles
  res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - access token has expired , the only way to have new access token is using refresh
å
const refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) {
    throw new UnauthenticatedError('Unauthorized.')
  }

  // if we have it, we will set the refresh token var to that cookie
  const refreshToken = cookies.jwt

  // verify
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err)
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' })

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec()

      if (!foundUser) {
        throw new UnauthenticatedError('Unauthorized.')
      }

      const accessToken = foundUser.createAccessToken()

      res.json({ accessToken })
    })
  )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(StatusCodes.NO_CONTENT) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}

module.exports = {
  login,
  refresh,
  logout,
}
