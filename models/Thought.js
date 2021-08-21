const {Schema, model, Types} = require('mongoose');

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
      default: Date.now
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
      default: Date.now
    },
    username: {
      type: String,
      required: true
    },
    reaction: [ReactionSchema]
  },
  {
    toJson: {
      virtuals: true,
      getter: true
    }
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reaction.length;
})

//create thought schema
const Thought = model('Thought', ThoughtSchema);

//export Thought model
module.exports = Thought;