const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/
    },
    thoughts: [],
    friends: []
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length
})