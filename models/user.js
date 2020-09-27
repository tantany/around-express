const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=%]+\.[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=%]+(#$)?/gi;
        return regex.test(v);
      },
      message: 'Please enter a URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
