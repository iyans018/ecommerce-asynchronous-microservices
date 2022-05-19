const { UserModel } = require('../../models');
const { responseAPI, comparePassword, signJWT, createRefreshToken } = require('../../utils');
const { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../utils/status-codes');
const { validateLogin } = require('../../config/joi-validation');

module.exports = async (req, res, next) => {
  try {
    // validate body/form input from user sign in
    const { error } = validateLogin(req.body);
    if (error) return responseAPI(res, BAD_REQUEST, null, error.details[0].message);
  
    // find user by email
    const userData = await UserModel.findOne({ email: req.body.email });
    if (!userData) return responseAPI(res, UNAUTHORIZED, null, 'Email atau password yang anda masukan salah');

    // cek apakah password sudah benar atau belum
    const isPasswordValid = await comparePassword(req.body.password, userData.password);
    if (!isPasswordValid) return responseAPI(res, UNAUTHORIZED, null, 'Email atau password yang anda masukan salah');

    // create access token
    const payloadToken = {
      id: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      isAdmin: userData.isAdmin,
    }
    const accessToken = signJWT(payloadToken);

    // create refresh token
    const refreshToken = await createRefreshToken(userData);

    // destructured userData for the response API
    const { password, isAdmin, ...userDataResponse } = userData._doc;

    return responseAPI(res, OK, { ...userDataResponse, accessToken, refreshToken }, 'Login berhasil');
  } catch (error) {
    console.log(error);
    return responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Login gagal');
  }
}