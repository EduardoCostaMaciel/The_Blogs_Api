const express = require('express');
const rescue = require('express-rescue');

const postController = require('../../controllers/Posts/post');

const { createPost } = require('../../schemas/JoiSchemas/PortSchemas/postSchema');
const validSchemas = require('../../schemas/middlewares/validSchemas');
const validToken = require('../../auth/middlewares/validToken');

const postRouter = express.Router();

postRouter.post('/', validSchemas(createPost), validToken.verifyToken, rescue(postController.createPost));

module.exports = postRouter;
