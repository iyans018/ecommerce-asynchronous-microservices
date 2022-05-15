const { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('../../utils/status-codes');
const { RefreshTokenModel } = require('../../models');
const { signJWT, responseAPI, verifyRefreshToken } = require('../../utils');
const { validateRefreshToken } = require('../../config/joi-validation');

module.exports = async (req, res) => {
  try {
    // cek request token di body    
    const { error } = validateRefreshToken(req.body);
    if (error) return responseAPI(res, UNAUTHORIZED, null, error.details[0].message);
    
    const refreshToken = await RefreshTokenModel.findOne({ token: req.body.refreshToken }).populate('user');
    
    if (!refreshToken) {
      return responseAPI(res, UNAUTHORIZED, null, 'Refresh token tidak di temukan');
    }

    if (verifyRefreshToken(refreshToken)) {
      await RefreshTokenModel.findByIdAndRemove(refreshToken._id, { useFindAndModify: false });

      return responseAPI(res, UNAUTHORIZED, null, 'Refresh token telah kadaluarsa');
    }

    // Membuat access token baru
    const payloadToken = {
      id: refreshToken.user._id,
      email: refreshToken.user.email,
      name: refreshToken.user.name,
      isAdmin: refreshToken.user.isAdmin,
    }
    const newAccessToken = signJWT(payloadToken);

    
    const responseData = {
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    }

    return responseAPI(res, OK, responseData, 'Access token baru berhasil dibuat');
  } catch (error) {
    console.error(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Gagal membuat access token baru');
  }
}