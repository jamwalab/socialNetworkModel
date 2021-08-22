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
        //if exists, get the username and add
        body.username = userData[0].username;
        return body;
      })
      .then(newBody => {
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
      .catch(err => res.status(400).json(err));
  },

  //Update a thought
  updateThought({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      {thoughtText: body.thoughtText},
      {new: true, runValidators: true}
    )
    .then(thoughtData => {
      if(!thoughtData) {
        //check if thought exists
        res.status(400).json({message: 'No thought found with this id'});
        return;
      };
      res.json(thoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  //delete thought
  deleteThought({params}, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      { $pull: { thoughts: params.thoughtId } },
      {new: true, runValidators: true}
    )
    .then(userData => {
      if(!userData) {
        return res.status(404).json({ message: 'Incorrect user!! Please provide correct user details for this thought!!' });
      }
      Thought.findOneAndDelete({_id: params.thoughtId})
        .then(thoughtData => {
          //check if thought exists
          if(!thoughtData) {
            res.status(400).json({message: 'No thought found with this id'});
            return;
          };
          res.json({message: 'Thought has been deleted!!'});
        })
    })
    .catch(err => res.status(400).json(err));
  },

  //Add reaction
  addReaction({params, body}, res) {
    User.find({_id: params.userId})
      .then(userData => {
        //check if user exists
        if(!userData) {
          res.status(400).json({message: 'Incorrect user information! Please try again!!'});
          return;
        };
        //if exists, get the username and add
        body.username = userData[0].username;
        return body;
      })
      .then(newBody => {
        Thought.findOneAndUpdate(
          {_id: params.thoughtId},
          { $push: { reaction: newBody } },
          {new: true, runValidators: true}
        )
        .then(thoughtData => {
          //check if thought exists
          if(!thoughtData) {
            res.status(400).json({message: 'No thought found with this id'});
            return;
          };
          res.json(thoughtData);
        }) 
      })
      .catch(err => res.status(400).json(err));  
  },

  //Delete reaction
  deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      { $pull: { reaction: { reactionId: params.reactionId } } },
      {new: true, runValidators: true}
    )
    .then(thoughtData => {
      //check if thought exists
      if(!thoughtData) {
        res.status(400).json({message: 'No thought found with this id'});
        return;
      };
      res.json(thoughtData);
    })
    .catch(err => res.status(400).json(err));
  },
};

module.exports = thoughtController;