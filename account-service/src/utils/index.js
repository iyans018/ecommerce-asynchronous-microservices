const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const { JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION ,SECRET_KEY } = require('../config/env');
const { RefreshTokenModel } = require('../models');
const env = require('../config/env');

// Utility functions
module.exports.generateSalt = async() => {
  return await bcrypt.genSalt();
}

module.exports.hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
}

module.exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

// Formatting response API in JSON
module.exports.responseAPI = (res, status, data, message) => {
  if (status === 200 || status === 201) {
    return res.status(status).json({ success: true, data, message });
  }

  return res.status(status).json({ success: false, data, message });
}

// sign jwt
module.exports.signJWT = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_ACCESS_EXPIRATION });
}

// verify jwt
module.exports.verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { payload: decoded, message: 'berhasil terverifikasi' };
  } catch (error) {
    return { payload: null, message: error.message };
  }
}

// create refresh token
module.exports.createRefreshToken = async (user) => {
  // create expired time for token
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + JWT_REFRESH_EXPIRATION);

  // generate refresh token from uuidv4
  const _token = uuidv4();

  // create new refresh token in database
  const _object = new RefreshTokenModel({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime()
  });
  const refreshToken = await _object.save();

  return refreshToken.token;
}

// verify refresh token expiration
module.exports.verifyRefreshToken = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
}

// send email
module.exports.sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      service: env.EMAIL_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      }
    });

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent');
    console.log(error);
  }
}

// create random string
module.exports.generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
}