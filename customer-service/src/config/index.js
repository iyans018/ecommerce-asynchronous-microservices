const dotEnv = require('dotenv');

dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
}