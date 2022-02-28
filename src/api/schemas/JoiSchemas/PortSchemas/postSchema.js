const Joi = require('joi');

module.exports = {
  createPost: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};