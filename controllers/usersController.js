const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { response } = require('express')

// @desc Get All Users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // dont return password
  const users = await User.find().select('-passwords').lean()
  if (!users) {
    return res.status(400).json({ message: 'User not found' })
  }
  res.json(users)
})

// @desc Create a New User
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  console.log('hi')
  const { username, password, roles } = req.body

  // confirm data

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    throw new BadRequestError('All fields are required.')

    // TODO: check if error thrown
    // return res.status(400).json({message: 'All fields are required.'})
  }

  // check for duplicate , lean for faster lookup
  const duplicate = await User.findOne({ username }).lean().exec()

  if (duplicate) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: 'Duplicate username' })
  }

  // Hash password
  // TODO: trasfer to model
  //   const hashedPwd = await bcrypt.hash(password, 10)

  //   const userObject = { username, password: hashedPwd, roles }

  // Create and store new user
  // middleware hashes the password
  const user = await User.create({ ...req.body })
  //   console.log(user)

  // successfully created user
  if (user) {
    res
      .status(StatusCodes.CREATED)
      .json({ message: `New user ${username} created` })
  } else {
    throw new BadRequestError('Invalid User Data Received')
  }
})

// @desc Update a User
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {})

// @desc Delete a User
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {})

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }
