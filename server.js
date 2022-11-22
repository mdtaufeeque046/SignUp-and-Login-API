const express = require('express');
const app = express();
require('./database/db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const PORT = 8500;


/* API Routers */
const userRouter = require('./router/userRouter');
app.use('/user', userRouter);

/* Server Listen */
app.listen(PORT, () => {
   console.log('Server is running on Port ', PORT);
})


