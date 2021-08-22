const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: 'Reaction body cannot be empty.',
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Text cannot be empty.',
      minLength: 1,
      maxLength: 250
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reaction: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);
//Virtual to count reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reaction.length;
});

//create thought schema
const Thought = model('Thought', ThoughtSchema);

//export Thought model
module.exports = Thought;