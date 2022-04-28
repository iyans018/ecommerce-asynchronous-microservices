const bcrypt = require('bcrypt');

// Utility functions
module.exports.generateSalt = async() => {
  return await bcrypt.genSalt();
}

module.exports.hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
}

module.exports.responseData = (status, data, message) => {
  return { status, data, message }
}