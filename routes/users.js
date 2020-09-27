const userRouter = require('express').Router();
const {
  createUser, getUsers, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRouter.post('/users', createUser);

userRouter.get('/users', getUsers);

userRouter.get('/users/:id', getUser);

userRouter.patch('/users/me', updateProfile);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
