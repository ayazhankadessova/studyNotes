const { StatusCodes } = require('http-status-codes')
const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const { BadRequestError, NotFoundError } = require('../errors')
const { response } = require('express')

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  // Get all notes from MongoDB
  const notes = await Note.find().lean()

  // If no notes
  if (!notes?.length) {
    throw new BadRequestError('No notes found')
  }

  // console.log(notes)

  // Add username to each note before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec()
      return { ...note, username: user.username }
    })
  )

  res.json(notesWithUser)
})
