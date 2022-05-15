const { UserModel } = require('../../models');
const { responseAPI } = require('../../utils');
const { INTERNAL_SERVER_ERROR, OK } = require('../../utils/status-codes');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;

    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    // destructured user data
    const { password, ...user } = updatedUser._doc;

    return responseAPI(res, OK, user, 'Berhasil memperbaharui data profile user');
  } catch (error) {
    console.error(error);
    responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Gagal memperbaharui data profile user');
  }
}