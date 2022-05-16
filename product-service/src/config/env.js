// const dotEnv = require('dotenv');
import dotEnv from "dotenv";

dotEnv.config();

export default {
  PORT: process.env.PORT,
  DB_URI: process.env.MONGODB_URI
}