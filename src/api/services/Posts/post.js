const { Post, User } = require('../../../database/models');

const createPost = async ({ title, content }, email) => {
  const { id } = await User.findOne({ where: { email } });

  const { id: idPost } = await Post.create({
    title, content, userId: id, published: new Date(), updated: new Date() })

  const post = await Post.findByPk(
    idPost,
    { attributes: { exclude: ['id','published', 'updated'] } }
  );

  return { status: 201, data: post };
};

module.exports = {
  createPost,
};
