// const md5 = require('md5');
const { User } = require('../../../database/models');
const createToken = require('../../auth/jwt/jwtFunc')

const createUser = async ({ displayName, email, password, image }) => {
  // const hashPassword = md5(password);
  // console.log('hash', hashPassword);

  const user = await User.findOne({ where: { email } });
  if (user) return { status: 409, data: { message: 'Usuário já existe' } }
  
  await User.create({ displayName, email, password, image });
  
  const token = createToken.createToken({ email });

  return { status: 201, data: { token } };
};

const findAllUser = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 200, data: { users } };
};

const findOneUser = async (id) => {
  const data = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!data) return { status: 404, data: { message: 'Usuário não existe' } }

  return { status: 200, data };
};

const deleteUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  await user.destroy();

  return { status: 204 }
};

module.exports = {
  createUser,
  findAllUser,
  findOneUser,
  deleteUser,
}