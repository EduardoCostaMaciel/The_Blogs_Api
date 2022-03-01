const express = require('express');
const rescue = require('express-rescue');

const postController = require('../../controllers/Posts/post');

const { createPost } = require('../../schemas/JoiSchemas/PortSchemas/postSchema');
const validSchemas = require('../../schemas/middlewares/validSchemas');
const validToken = require('../../auth/middlewares/validToken');

const postRouter = express.Router();

postRouter.post('/', validSchemas(createPost), validToken.verifyToken, rescue(postController.createPost));
postRouter.get('/', validToken.verifyToken, rescue(postController.findAllPosts));
postRouter.get('/search', validToken.verifyToken, rescue(postController.searchPost));
postRouter.get('/:id', validToken.verifyToken, rescue(postController.findByPkPost));
postRouter.put('/:id', validSchemas(createPost), validToken.verifyToken, rescue(postController.updatePost));
postRouter.delete('/:id', validToken.verifyToken, rescue(postController.deletePost));

module.exports = postRouter;
