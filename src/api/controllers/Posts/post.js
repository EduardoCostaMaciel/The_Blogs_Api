const servicesPost = require('../../services/Posts/post');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const { status, data } = await servicesPost.createPost({ title, content }, email);

  return res.status(status).json(data);
};

module.exports = {
  createPost,
};