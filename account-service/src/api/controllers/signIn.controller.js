const { UserModel } = require('../../models');
const { responseAPI, comparePassword, signJWT, createRefreshToken } = require('../../utils');
const { OK, UNAUTHORIZED } = require('../../utils/status-codes')

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseAPI(res, UNAUTHORIZED, null, 'Email dan password harus diisi');
    }
  
    const userData = await UserModel.findOne({ email });

    if (!userData || await !comparePassword(password, userData.password)) {
      return responseAPI(res, UNAUTHORIZED, null, 'Email atau password yang anda masukan salah');
    }

    // create access token
    const payloadToken = {
      id: userData._id,
      email: userData.email,
      name: userData.name,
      isAdmin: userData.isAdmin,
    }
    const accessToken = signJWT(payloadToken);

    // create refresh token
    const refreshToken = await createRefreshToken(userData);

    return responseAPI(res, OK, { ...userData._doc, accessToken, refreshToken }, 'Login berhasil');
  } catch (error) {
    console.log(error);
  }
}