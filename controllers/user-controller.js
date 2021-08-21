const { User, Thought } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get user by id
  getUserbyId({params}, res) {
    User.find({_id: params.userId})
      .populate(
        {
          path: 'thoughts',
          select: ('-__v')
        }
      )
      .populate(
        {
          path: 'friends',
          select: ('-__v')
        }
      )
      .select('-__v')
      .then(userData => {
        if(!userData) {
          //check if user exists
          res.status(400).json({message: 'No user found with this id'});
          return;
        };
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  //Add new user
  createUser({body}, res) {
    User.create(body)
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },

};

module.exports = userController;