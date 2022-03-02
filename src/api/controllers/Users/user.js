const serviceUser = require('../../services/Users/user');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { status, data } = await serviceUser.createUser({ displayName, email, password, image });

  return res.status(status).json(data);
};

const findAllUser = async (_req, res) => {
  const { status, data: { users } } = await serviceUser.findAllUser();
  return res.status(status).json(users);
};

const findOneUser = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await serviceUser.findOneUser(id);

  return res.status(status).json(data);
};

const deleteUser = async (req, res) => {
  const { email } = req.user;
  const { status } = await serviceUser.deleteUser(email);

  return res.status(status).end();
};

module.exports = {
  createUser,
  findAllUser,
  findOneUser,
  deleteUser,
};