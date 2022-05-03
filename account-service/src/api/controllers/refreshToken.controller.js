const { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('../../utils/status-codes');
const { RefreshTokenModel } = require('../../models');
const { signJWT, responseAPI, verifyRefreshToken } = require('../../utils');

module.exports = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (!requestToken) {
    return responseAPI(res, UNAUTHORIZED, null, 'Silahkan masukan refresh token di body');
  }

  try {
    const refreshToken = await RefreshTokenModel.findOne({ token: requestToken }).populate('user');
    
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
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Terjadi kesalahan pada server');
  }
}