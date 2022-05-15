const dotEnv = require('dotenv');

dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
}