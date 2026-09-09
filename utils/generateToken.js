const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

module.exports = function generateToken(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
};
