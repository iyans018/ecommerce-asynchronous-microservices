const { UserModel: User } = require('../../models');
const { responseAPI, generateRandomString, sendEmail } = require('../../utils');
const { NO_CONTENT, UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../utils/status-codes');
const { validateForgotPassword } = require('../../config/joi-validation');
const env = require('../../config/env');

module.exports = async (req, res) => {
  try {
    // validate body/form input forgot password
    const { error } = validateForgotPassword(req.body);
    if (error) return responseAPI(res, BAD_REQUEST, null, error.details[0].message);

    const user = await User.findOne({ email: req.body.email });

    if (!user) return responseAPI(res, UNAUTHORIZED, null, 'Email yang anda masukan tidak terdaftar');

    const userUpdate = await User.findByIdAndUpdate(
      user._id, 
      { forgotPasswordToken: generateRandomString(24) },
      { new: true }
    );

    const link = `${env.BASE_URL}/reset-password/${user._id}/${userUpdate.forgotPasswordToken}`;
    await sendEmail(user.email, 'Reset Password', link);

    return responseAPI(res, NO_CONTENT, null, 'Email reset password berhasil dikirim');
  } catch (error) {
    console.error(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Terjadi kesalahan');
  }
}