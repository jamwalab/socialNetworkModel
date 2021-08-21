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
    User.find({_id: params.id})
      .populate(
        {
          path: 'thoughts',
          select: ('-__v')
        },
        {
          path: 'friends',
          select: ('-__v')
        }
      )
      .select('-__v')
      .then(userData => {
        if(!userData) {
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

  //
}