const express = require('express')
const router = express.Router()
const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController')

const verifyJWT = require('../middleware/verifyJWT')
// now verifyJWT is applied to all of the routes inside the router
router.use(verifyJWT)

// look into the views folder & look at the index.html file
router
  .route('/')
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote)

module.exports = router
