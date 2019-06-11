const express = require('express');

const  userController = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.post('/allusers', userController.getUsersLimitbyStr);
userRouter.get('/allusersnofilter', userController.getAllUsers);


module.exports = userRouter;
