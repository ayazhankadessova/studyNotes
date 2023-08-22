const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController')

// look into the views folder & look at the index.html file
router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router
