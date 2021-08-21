const router = require('express').Router();

const {
  getAllUsers,
  getUserbyId,
  createUser
} = require('../../controllers/user-controller');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getUserbyId);

module.exports = router;