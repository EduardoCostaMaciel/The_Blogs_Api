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

const updatePost = async (req, res) => {
  const { params: { id }, user: { email }, body: { title, content } } = req;
  const { status, data } = await servicesPost.updatePost({ title, content }, id, email);
  return res.status(status).json(data);
};

const searchPost = async (req, res) => {
  const { q: query } = req.query;
  const { status, data } = await servicesPost.searchPost(query);
  return res.status(status).json(data);
};

const deletePost = async (req, res) => {
  const { params: { id }, user: { email } } = req;
  const { status, message } = await servicesPost.deletePost(id, email);

  if (message) return res.status(status).json({ message });

  return res.status(status).end();
};

module.exports = {
  createPost,
  findAllPosts,
  findByPkPost,
  updatePost,
  deletePost,
  searchPost,
};
