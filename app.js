const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f709c4bb26fd719b804e476',
  };

  next();
});
app.use('/', userRouter);
app.use('/', cardRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'card or user not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
