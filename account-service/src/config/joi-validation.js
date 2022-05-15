const Joi = require('joi');

const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    phoneNumber: Joi.string().required()
  });

  return schema.validate(data);
}

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
}

const validateRefreshToken = (data) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  });

  return schema.validate(data);
}

const validateChangePassword = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required().min(6),
    newPassword: Joi.string().required().min(6),
    reTypeNewPassword: Joi.string().required().min(6)
  });

  return schema.validate(data);
}

module.exports = {
  validateUser,
  validateLogin,
  validateRefreshToken,
  validateChangePassword
}