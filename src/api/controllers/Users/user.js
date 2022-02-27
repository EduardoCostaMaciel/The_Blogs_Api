const serviceUser = require('../../services/Users/user');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { status, data } = await serviceUser.createUser({displayName, email, password, image});

  return res.status(status).json(data);
};

module.exports = {
  createUser,
}