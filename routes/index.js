const express = require('express');

const router = express.Router();
const { auth } = require('../middleware/auth');
const userRouter = require('./users');
const articleRouter = require('./articles');

router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

module.exports = {
  router,
};
