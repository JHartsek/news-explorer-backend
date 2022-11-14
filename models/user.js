const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = {
  userModel,
};
