const { responseAPI } = require('../../utils');
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('../../utils/status-codes');

module.exports = (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      return responseAPI(res, UNAUTHORIZED, null, 'Anda tidak memiliki akses untuk mengakses API ini');
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Terjadi kesalahan pada server');
  }
}