const { UserModel } = require("../../models");
const { responseAPI, generateSalt, hashPassword } = require("../../utils");
const { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../utils/status-codes');
const { validateUser } = require('../../config/joi-validation');

module.exports = async (req, res, next) => {
  try {
    // validate body/form input from user register
    const { error } = validateUser(req.body);
    if (error) return responseAPI(res, BAD_REQUEST, null, error.details[0].message);

    // check if user already exists
    const registeredUser = await UserModel.findOne({ email: req.body.email });
    if (registeredUser) {
      return responseAPI(res, BAD_REQUEST, null, "Pengguna sudah terdaftar");
    }

    // hashing password
    let salt = await generateSalt();
    let hashedPassword = await hashPassword(req.body.password, salt);

    // save the user to database
    const userData = new UserModel({ 
      email: req.body.email,
      password: hashedPassword, 
      name: req.body.name, 
      gender: req.body.gender, 
      phoneNumber: req.body.phoneNumber
    });
    const user = await userData.save();

    // destructured user to return the response
    const { password, isAdmin, ...rest } = user._doc;

    return responseAPI(res, CREATED, rest, 'User berhasil didaftarkan');
  } catch (error) {
    console.error(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'User gagal didaftarkan');
  }
}