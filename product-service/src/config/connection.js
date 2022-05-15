const mongoose = require('mongoose');
const { DB_URI } = require('./env');

module.exports = async() => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};