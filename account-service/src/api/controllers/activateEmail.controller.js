const { UserModel: User } = require("../../models");
const { responseAPI } = require("../../utils");
const { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../utils/status-codes');

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return responseAPI(res, BAD_REQUEST, null, "Link tidak valid");

    if (user.isActive) return responseAPI(res, BAD_REQUEST, null, "User sudah diaktivasi");

    if (user.activationToken !== req.params.token) return responseAPI(res, BAD_REQUEST, null, "Link tidak valid");

    await User.findByIdAndUpdate(
      req.params.id, 
      { isActive: true, $unset: { activationToken: 1 } },
      { new: true }
    );

    return responseAPI(res, CREATED, null, "User berhasil diaktivasi");
  } catch (error) {
    console.error(error);
    responseAPI(res, INTERNAL_SERVER_ERROR, null, 'Gagal aktivasi akun');
  }
}