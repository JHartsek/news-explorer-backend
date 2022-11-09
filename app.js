const express = require('express');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
const PORT = 3001;

app.use(requestLogger);

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
