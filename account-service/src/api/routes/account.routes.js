const express = require('express');
const router = express.Router();

const { loginController, registerController, refreshTokenController, logoutController, changePasswordController } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, (req, res) => res.status(200).json({ message: "OK" }));
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/refresh-token', refreshTokenController);
router.delete('/logout', logoutController);
router.put('/change-password', verifyToken, changePasswordController);

module.exports = router;