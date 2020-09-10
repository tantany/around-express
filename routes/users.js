const userRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getDataFromFile = (pathToFile) => fs.readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data));

const getUsers = (req, res) => getDataFromFile(dataPath)
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(404).send({ message: 'Requested resource not found' }));

const getUser = (req, res) => getDataFromFile(dataPath)
  .then((users) => users.find((user) => user._id === req.params.id))
  .then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User ID not found' });
    }
  })
  .catch(() => res.status(404).send({ message: 'Requested resource not found' }));

userRouter.get('/users', getUsers);

userRouter.get('/users/:id', getUser);

module.exports = userRouter;
