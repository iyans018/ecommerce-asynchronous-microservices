const dotEnv = require('dotenv');

dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  BASE_URL: process.env.BASE_URL,
}