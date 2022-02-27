const express = require('express');
const rescue = require('express-rescue');

const userController = require('../../controllers/Users/user');

const { createUser } = require('../../schemas/JoiSchemas/UserSchemas/userSchema');
const validSchemas = require('../../schemas/middlewares/validSchemas');

const userRouter = express.Router();

userRouter.post('/', validSchemas(createUser), rescue(userController.createUser));

module.exports = userRouter;