const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errors');

const app = express();
app.use(express.json());
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/news');
const PORT = 3000;

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
