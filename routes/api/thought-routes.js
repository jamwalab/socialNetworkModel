const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtsbyId,
  createThoughts
} = require('../../controllers/thought-controller');

router.route('/')
  .get(getAllThoughts);

router.route('/:userId')
  .post(createThoughts);

router.route('/:userId/:thoughtId')
  .get(getThoughtsbyId);
    
module.exports = router;