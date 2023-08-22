const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

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
const createNewUser = asyncHandler(async (req, res) => {})

// @desc Update a User
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {})

// @desc Delete a User
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {})

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }
