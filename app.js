const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
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

app.post('/signup', createUser);
app.post('/signin', login);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
