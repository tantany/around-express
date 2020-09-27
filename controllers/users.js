const User = require('../models/user');
const errStatus = require('../utils/errStatus');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ message: 'card or user not found' });
      }
    })
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};
