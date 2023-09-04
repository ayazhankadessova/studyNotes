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
  const users = await User.find().select('-password').lean()

  //   if (!user?.length) -> optional chaining

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: 'Users not found' })
  }
  res.json(users)
})

// @desc Create a New User
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
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
  // TODO: transfer to model
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
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body

  // confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    throw new BadRequestError('All fields are required')
  }

  const user = await User.findById(id).exec()

  if (!user) {
    throw new BadRequestError('User not found.')
  }

  // Check for duplicate, so that we update only the original user
  const duplicate = await User.findOne({ username }).lean().exec()
  // Allow updates to the original user, not duplicate
  // we dont want to change username to what already exists
  if (duplicate && duplicate?._id.toString() !== id) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: 'Duplicate username' })
  }

  user.username = username
  user.roles = roles
  user.active = active

  if (password) {
    user.password = password
  }

  // can use save bc didnt use lean
  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a User
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  // destructure id from body
  const { id } = req.body

  if (!id) {
    throw new BadRequestError('User ID required.')
  }

  const note = await Note.findOne({ user: id }).lean().exec()

  // cannot delete if user has assigned notes
  if (note) {
    throw new BadRequestError('User has assigned notes.')
  }

  const user = await User.findById(id).exec()

  if (!user) {
    throw new BadRequestError('User not found.')
  }

  // will hold deleted user's info
  const result = await user.deleteOne()

  const reply = `Username ${result.username} with ID ${result._id} deleted`

  res.json(reply)
})

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }
