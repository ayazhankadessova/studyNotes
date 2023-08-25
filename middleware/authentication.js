const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('No Token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // attach the user to the job routes
    req.user = { userId: decoded.userId, name: decoded.name }

    // can also find by id
    // const user = User.findById(decoded.id).select('-password')
    // req.user = user

    next()
  } catch (err) {
    throw new UnauthenticatedError('Authentication failed')
  }
}

module.exports = authMiddleware
