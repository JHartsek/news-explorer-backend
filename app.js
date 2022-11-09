const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { validateCreateUser, validateLogin } = require('./helpers/validators');
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

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
