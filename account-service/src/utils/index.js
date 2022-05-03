const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_ACCESS_EXPIRATION, SECRET_KEY } = require('../config/env');

const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgFz5NVTXrcQ5EbOe6QfwfMijc+FEsFkINIIIijwqnb9/HPs201sg
iP/gykfHKx+m8L1tkSMDNIHO/hT7lj8tKdUgTuxvVcsZhrIkUnpXlPQ4Fu/8IdbQ
/fgIGiyk7FvsEgM4vNK6Dp9lbsvcD6VOLhq05EK59IDl5VNbuizVBAiRAgMBAAEC
gYAk6EjjhTrVylHcnBilrjHa9AfsRPg8X6V4eStm9wPoIO3AS+NbKW85JGMoW0gj
KIIosHYNEBin7yOt8LGUIrmYBt3t49e2g7NU3l5Jfd34RpHkFKONQYJBk3+jnsZr
9lsJlfBa3JGOE4g4h7tD91MhPlpDssB/yjnwua/nRo5WAQJBAJtOtnUt1m/oYMXF
wMJ+3FC1vJ3riXVYEMrYH/xk4SNvMh5feQOvKNnkYaDcu0PJc7UkHoa8iY65AXiy
OqjYpCUCQQCZQI7BvKLWjMHsX56KTo3wueSVPdc6HiiFWrKeCgzr1YN5hNxDAOS0
QY7qZN2TxRRoBWVAt6BTxWcbEvUZsZD9AkAvjKTeMX+C2bGvO4FtyutnJo0uCGwY
ajMR96OrYbNwZt4AYJirYRhvxbWCS7Jl6aqsXfeepuCyur/RlTfSdCmlAkBVhl+k
4v8FORxoK5ywltJDy5ozZ4WbW4VFlq4j4HwBiPCMeobppa/8oLF/QbceZlfTDV/K
VC/XUE0QIO5D3oKJAkBq6TcSutL17Y63OEGtzWHGpTFmHUR9iAArIXrWq46MX+zb
6XdDHjGn+ZBdwFOqx/SxJcUemqrV9x2XedN9Up8S
-----END RSA PRIVATE KEY-----`

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFz5NVTXrcQ5EbOe6QfwfMijc+FE
sFkINIIIijwqnb9/HPs201sgiP/gykfHKx+m8L1tkSMDNIHO/hT7lj8tKdUgTuxv
VcsZhrIkUnpXlPQ4Fu/8IdbQ/fgIGiyk7FvsEgM4vNK6Dp9lbsvcD6VOLhq05EK5
9IDl5VNbuizVBAiRAgMBAAE=
-----END PUBLIC KEY-----`

// Utility functions
module.exports.generateSalt = async() => {
  return await bcrypt.genSalt();
}

module.exports.hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
}

module.exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

// Formatting response API in JSON
module.exports.responseAPI = (res, status, data, message) => {
  if (status === 200) {
    return res.status(status).json({ success: true, data, message });
  }

  return res.status(status).json({ success: false, data, message });
}

// sign jwt
module.exports.signJWT = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// verify jwt
module.exports.verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}