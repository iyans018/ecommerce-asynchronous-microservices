const { UserModel } = require("../../models");
const { responseAPI, generateSalt, hashPassword, generateRandomString, sendEmail } = require("../../utils");
const { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../utils/status-codes');
const { validateUser } = require('../../config/joi-validation');
const env = require('../../config/env');

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
      firstName: req.body.firstName, 
      lastName: req.body.lastName,
      gender: req.body.gender,
      activationToken: generateRandomString(32),
    });
    const user = await userData.save();

    const message = `${env.BASE_URL}/activate/${user._id}/${user.activationToken}`;
    await sendEmail(user.email, "Aktivasi Akun", message);

    // destructured user to return the response
    const { password, isAdmin, activationToken, ...rest } = user._doc;

    return responseAPI(res, CREATED, rest, 'User berhasil didaftarkan. Silahkan cek email anda untuk aktivasi');
  } catch (error) {
    console.error(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'User gagal didaftarkan');
  }
}