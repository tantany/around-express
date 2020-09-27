const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    requiered: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'likes',
    requiered: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
