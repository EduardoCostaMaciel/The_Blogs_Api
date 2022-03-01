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

const findByPkPost = async (id) => {
  const post = await Post.findByPk(
    id,
    {
      attributes: { exclude: ['userId'] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
      ]
    },
  );
  if(!post) return { status: 404, data: { message: 'Post não existe' } }
  return { status: 200, data: post };
};

const updatePost = async ({ title, content }, id, email) => {
  const { id: idUser } = await User.findOne({ where: { email } });

  const { userId } = await Post.findByPk(id);

  if(idUser !== userId) return { status: 401, data: { message: 'Usuário não autorizado' } };

  await Post.update({ title, content }, { where: { id } });

  const post = await Post.findByPk(
    id,
    { attributes: { exclude: ['id','published', 'updated'] } }
  );

  return { status: 200, data: post };
};

module.exports = {
  createPost,
  findAllPosts,
  findByPkPost,
  updatePost,
};
