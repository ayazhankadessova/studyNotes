const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

// what do we want to accomplish before we save
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (givenPassword) {
  const isMatch = bcrypt.compare(givenPassword, this.password) // true
  return isMatch
}

UserSchema.methods.createAccessToken = function () {
  return jwt.sign(
    {
      UserInfo: {
        username: this.username,
        roles: this.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m',
    }
  )
}

UserSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    {
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d',
    }
  )
}

module.exports = mongoose.model('User', UserSchema)
