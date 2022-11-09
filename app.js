const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { Joi, celebrate, errors } = require('celebrate');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errors');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/news');
const PORT = 3000;

app.use(requestLogger);

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
