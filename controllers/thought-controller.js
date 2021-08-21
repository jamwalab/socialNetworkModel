const { User, Thought  } = require('../models');

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
    Thought.find({_id: params.thoughtId})
      .select('-__v')
      .then(thoughtData => {
        if(!thoughtData) {
          //check if thought exists
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
    //Find the user first
    User.find({_id: params.userId})
      .then(userData => {
        //check if user exists
        if(!userData) {
          res.status(400).json({message: 'Thought cannot be added as no user found with this id!'});
          return;
        };
        console.log(userData);
        //if exists, get the username and add
        body.username = userData[0].username;
        console.log(body);
        return body;
      })
      .then(newBody => {
        console.log(newBody);
        //create new thought
        Thought.create(newBody)
          .then(({_id}) => {
            //update user thought array
            return User.findOneAndUpdate(
              {_id: params.userId},
              {$push: {thoughts: _id}},
              {new: true, runValidators: true}
            );
          })
          .then(newUserData => res.json(newUserData))      
      })
      .catch(err => res.json(err));
  },
};

module.exports = thoughtController;