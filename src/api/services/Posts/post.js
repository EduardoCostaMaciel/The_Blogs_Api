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

const findAllPosts = async () => {
  const posts = await Post.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ]
  });
  return { status: 200, data: posts };
};

module.exports = {
  createPost,
  findAllPosts,
};
