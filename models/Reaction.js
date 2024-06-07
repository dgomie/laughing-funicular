const { Schema, model } = require('mongoose');
const userSchema = require('./User')

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    username: {
        type: String,
        required: true
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

userSchema.virtual('reactionCount').get(function(){
    const formattedDate = this.createdAt.toLocaleString('en-US')
    return formattedDate
  })

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;