const Card = require('../models/card');
const errStatus = require('../utils/errStatus');

module.exports.createCard = (req, res) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
  const owner = req.user._id;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: 'card or user not found' });
      }
    })
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      res.status(errStatus(err.name).errorCode).send({ message: errStatus(err.name).errMessage });
    });
};
