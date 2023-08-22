const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

// need notename & pwd

const noteSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please, provide a user.'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [20, 'name cannot be more than 20 characters'],
    },
    text: {
      type: String,
      required: [true, 'Please provide a text'],
      trim: true,
      maxlength: [150, 'name cannot be more than 150 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

noteSchema.plugin(AutoIncrement, {
  // name our incr field, will be added to schema
  inc_field: 'ticket',
  id: 'ticketNums',
  // sep collection called counter will be created
  start_seq: 500,
})

module.exports = mongoose.model('Note', noteSchema)
