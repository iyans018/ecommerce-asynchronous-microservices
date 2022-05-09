const express = require('express');
const router = express.Router();

const { loginController, signUpController, refreshTokenController, signOutController } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, (req, res) => res.status(200).json({ message: "OK" }));
router.post('/login', loginController);
router.post('/signup', signUpController);
router.post('/refresh-token', refreshTokenController);
router.delete('/signout', signOutController);

module.exports = router;