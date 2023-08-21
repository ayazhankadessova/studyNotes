const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

// need username & pwd

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    trim: true,
    maxlength: [20, 'username cannot be more than 20 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    trim: true,
    minlength: [6, 'name cannot be less than 20 characters'],
  },
  // can have more than one role
  roles: [
    {
      type: String,
      default: 'Employee',
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
})

module.exports = mongoose.model('User', UserSchema)
