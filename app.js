const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/news');
const PORT = 3000;

app.use(requestLogger);

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'An error has occured on the server' : message });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
