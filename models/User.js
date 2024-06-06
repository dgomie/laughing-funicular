const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      unique: true,
      trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
          validator: function (v) {
            return emailRegex.test(v);
          },
          message: props => `${props.value} is not a valid email address!`
        }
      },
    thoughts: [thoughtSchema],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
  })

const Student = model('student', studentSchema);

module.exports = Student;
