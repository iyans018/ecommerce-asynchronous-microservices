const { UserModel } = require('../../models')
const { responseAPI } = require('../../utils');
const { INTERNAL_SERVER_ERROR, OK } = require('../../utils/status-codes');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await UserModel.findById(id);
    
    // destructuring user data to response for the api
    const { password, ...userData } = user._doc;

    return responseAPI(res, OK, userData, 'Berhasil mendapatkan data user');
  } catch (error) {
    console.error(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Gagal mendapatkan data profile user');
  }
}