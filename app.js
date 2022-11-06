const express = require('express');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');

const app = express();
const PORT = 3001;

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
