const { UserModel } = require("../../models");
const { responseAPI, generateSalt, hashPassword } = require("../../utils");
const { OK } = require('../../utils/status-codes');

module.exports = async (req, res, next) => {
  try {
    const { email, password, name, gender, isAdmin, phoneNumber } = req.body;

    // hashing password
    let salt = await generateSalt();
    let hashedPassword = await hashPassword(password, salt);

    const userData = new UserModel({ email, password: hashedPassword, name, gender, isAdmin, phoneNumber });

    const user = await userData.save();

    return responseAPI(res, OK, user, 'User berhasil didaftarkan');
  } catch (error) {
    console.error(error);
  }
}