const express = require('express');
const rescue = require('express-rescue');

const userController = require('../../controllers/Users/user');

const { createUser } = require('../../schemas/JoiSchemas/UserSchemas/userSchema');
const validSchemas = require('../../schemas/middlewares/validSchemas');
const validToken = require('../../auth/middlewares/validToken');

const userRouter = express.Router();

userRouter.post('/', validSchemas(createUser), rescue(userController.createUser));
userRouter.get('/', validToken.verifyToken, rescue(userController.findAllUser));

module.exports = userRouter;
