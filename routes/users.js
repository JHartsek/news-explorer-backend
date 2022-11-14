const express = require('express');

const userRouter = express.Router();
const { getCurrentUser } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

module.exports = userRouter;
