const servicesPost = require('../../services/Posts/post');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const { status, data } = await servicesPost.createPost({ title, content }, email);

  return res.status(status).json(data);
};

const findAllPosts = async (req, res) => {
  const { status, data } = await servicesPost.findAllPosts();
  res.status(status).json(data);
};

const findByPkPost = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await servicesPost.findByPkPost(id);
  return res.status(status).json(data);
};

module.exports = {
  createPost,
  findAllPosts,
  findByPkPost,
};