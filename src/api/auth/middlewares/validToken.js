const jwtFunc = require('../jwt/jwtFunc');

const verifyToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    const authUser = jwtFunc.verifyToken(token);
    req.user = authUser;
    next();
  } catch (_err) {
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  verifyToken,
};
