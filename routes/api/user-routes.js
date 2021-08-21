const router = require('express').Router();

const {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getUserbyId)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;