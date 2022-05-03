const { responseAPI, verifyJWT } = require('../../utils');
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('../../utils/status-codes');
const { SECRET_KEY } = require('../../config/env');

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
  
    if (!accessToken) {
      return responseAPI(res, UNAUTHORIZED, null, 'Access token tidak ditemukan');
    }

    const { payload, message } = verifyJWT(accessToken, SECRET_KEY);

    if (payload) {
      req.user = payload;
      next();
    } else {
      return responseAPI(res, UNAUTHORIZED, null, message);
    }
  } catch (error) {
    console.error(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Terjadi kesalahan pada server');
  }
}