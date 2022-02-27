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
}

module.exports = {
  createUser,
}