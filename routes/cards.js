const cardRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getDataFromFile = (pathToFile) => fs.readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data));

const getCards = (req, res) => getDataFromFile(dataPath)
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(500).send({ message: 'Requested resource not found' }));

cardRouter.get('/cards', getCards);

module.exports = cardRouter;
