const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.post('/cards', createCard);

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', deleteCard);

cardRouter.put('/cards/likes/:cardId', likeCard);

cardRouter.delete('/cards/likes/:cardId', dislikeCard);

module.exports = cardRouter;
