const { User } = require('../../../database/models');
const createToken = require('../../auth/jwt/jwtFunc');

const loginUser = async (data) => {
  const { email } = data;

  const user = await User.findOne({ where: { email } });
  if (!user) return { status: 400, data: { message: 'Campos inválidos' } };

  const token = createToken.createToken({ email })

  return { status: 200, data: { token } };
};

module.exports = {
  loginUser,
}
