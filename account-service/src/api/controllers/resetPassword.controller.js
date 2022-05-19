const { UserModel: User } = require('../../models');
const { responseAPI, generateSalt, hashPassword } = require('../../utils');
const { NO_CONTENT, UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../utils/status-codes');
const { validateResetPassword } = require('../../config/joi-validation');

module.exports = async (req, res) => {
  try {
    const { error } = validateResetPassword(req.body);
    if (error) return responseAPI(res, BAD_REQUEST, null, error.details[0].message);
    
    const { id, token } = req.params;
    const { newPassword, reTypeNewPassword } = req.body;

    const user = await User.findById(id);
    if (!user) return responseAPI(res, UNAUTHORIZED, null, 'Link tidak valid atau tidak ditemukan');

    if (user.forgotPasswordToken !== token) return responseAPI(res, UNAUTHORIZED, null, 'Link tidak valid atau tidak ditemukan');

    if (newPassword !== reTypeNewPassword) return responseAPI(res, BAD_REQUEST, null, 'Password baru dan konfirmasi password baru tidak sama');

    // hash new password
    let salt = await generateSalt();
    let hashedPassword = await hashPassword(newPassword, salt);

    // update user password
    await User.findByIdAndUpdate(id, { password: hashedPassword, $unset: { forgotPasswordToken: 1 } }, { new: true });

    return responseAPI(res, NO_CONTENT, null, 'Berhasil reset password');
  } catch (error) {
    console.error(error);
    responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Terjadi kesalahan');
  }
}