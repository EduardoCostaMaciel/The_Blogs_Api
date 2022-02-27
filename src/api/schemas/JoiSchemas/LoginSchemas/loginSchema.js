const Joi = require('joi');

module.exports = {
  loginUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};
