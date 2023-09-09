const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')
// now verifyJWT is applied to all of the routes inside the router
router.use(verifyJWT)

// look into the views folder & look at the index.html file
router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router
