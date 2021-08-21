const { User, Thought } = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get thought by id
  getThoughtsbyId({params}, res) {
    Thought.find({_id: params.id})
      .select('-__v')
      .then(thoughtData => {
        if(!thoughtData) {
          res.status(400).json({message: 'No thought found with this id'});
          return;
        };
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  //Add new thought
  createThoughts({params, body}, res) {
    User.find({_id: params.id})
      .then(userData => {
        if(!userData) {
          res.status(400).json({message: 'Thought cannot be added as no user found with this id!'});
          return;
        };
        body.username = userData.username;
        return body;
      })
      .then(newBody => {
        Thought.create(newBody)
          .then(({_id}) => {
            return User.findOneAndUpdate(
              {_id: params.id},
              {$push: {thoughts: _id}},
              {new: true, runValidators: true}
            );
          })
          .then(newUserData => res.json(newUserData))      
      })
      .catch(err => res.json(err));
  },
}