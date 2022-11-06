const express = require('express');
const userRouter = require('./routes/users');

const app = express();
const PORT = 3001;

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
