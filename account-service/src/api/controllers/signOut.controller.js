const { RefreshTokenModel } = require('../../models')
const { responseAPI } = require('../../utils');
const { OK } = require('../../utils/status-codes');

module.exports = async (req, res) => {  
  try {
    const refreshToken = req.headers["x-refresh-token"];
  
    if (!refreshToken) {
      return responseAPI(res, UNAUTHORIZED, null, 'Refresh token tidak ditemukan');
    }

    const deletedRefreshToken = await RefreshTokenModel.findOneAndRemove({ token: refreshToken }, { useFindAndModify: false });

    return responseAPI(res, OK, deletedRefreshToken, 'Berhasil keluar');
  } catch (error) {
    console.error(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Gagal sign out');
  }
}