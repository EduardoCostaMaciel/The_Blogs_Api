const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorMiddleware = require('./src/api/schemas/middlewares/errorMiddleware');

const app = express();

const server = require('http').createServer(app);

const userRouter = require('./src/api/routers/Users/user');

const corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/user', userRouter);

app.use(errorMiddleware);

module.exports = server;