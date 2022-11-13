const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
// const { limiter } = require('./utils/limiter');
const { validateCreateUser, validateLogin } = require('./helpers/validators');
const { createUser, login } = require('./controllers/users');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errors');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(helmet());
// app.use(limiter);
require('dotenv').config();

const { PORT = 3000, DATABASE = 'mongodb://localhost:27017/news' } = process.env;
mongoose.connect(DATABASE);

app.use(requestLogger);

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
