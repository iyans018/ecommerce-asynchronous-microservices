const { UserModel } = require('../../models');
const { responseAPI, comparePassword, generateSalt, hashPassword } = require('../../utils');
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../utils/status-codes');
const { validateChangePassword } = require('../../config/joi-validation');

module.exports = async (req, res, next) => {
  try{
    // validate the body input
    const { error } = validateChangePassword(req.body);
    if (error) return responseAPI(res, BAD_REQUEST, null, error.details[0].message);

    const { oldPassword, newPassword, reTypeNewPassword } = req.body;
    const { email } = req.user;

    // cek apakah password lama sudah benar atau belum
    const userData = await UserModel.findOne({ email });
    const isPasswordValid = await comparePassword(oldPassword, userData.password);
    if (!isPasswordValid) return responseAPI(res, BAD_REQUEST, null, 'Password lama yang anda masukan salah');

    // check if the new password and retype new password is the same
    if (newPassword !== reTypeNewPassword) return responseAPI(res, BAD_REQUEST, null, 'Password baru dan konfirmasi password baru tidak sama');

    // hash new password
    let salt = await generateSalt();
    let hashedPassword = await hashPassword(newPassword, salt);

    // update user password
    const updateUserPassword = await UserModel.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });

    // destructured user to return the response
    const { password, isAdmin, ...rest } = updateUserPassword._doc;

    return responseAPI(res, OK, rest, 'Berhasil memperbaharui password');
  } catch (error) {
    console.log(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Gagal mengganti password');
  }
}