const Joi = require('joi');

const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    phoneNumber: Joi.string().required()
  });

  return schema.validate(data)
}

module.exports = {
  validateUser,
}