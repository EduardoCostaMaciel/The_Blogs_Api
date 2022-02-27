const express = require('express');
const rescue = require('express-rescue');

const loginController = require('../../controllers/Logins/login');

const { loginUser } = require('../../schemas/JoiSchemas/LoginSchemas/loginSchema');
const validSchemas = require('../../schemas/middlewares/validSchemas');

const loginRouter = express.Router();

loginRouter.post('/', validSchemas(loginUser), rescue(loginController.loginUser));

module.exports = loginRouter;