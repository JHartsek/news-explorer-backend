const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./utils/limiter');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errors');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(helmet());

const PORT = 3000;
mongoose.connect('mongodb://localhost:27017/news');

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
