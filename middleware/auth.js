const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { jwtSecret } = require('../config/env');
const asyncHandler = require('../utils/asyncHandler');
module.exports = asyncHandler(async (req, _res, next) => {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) throw new ApiError(401, 'Authentication token is required', 'UNAUTHORIZED');
  try {
    const payload = jwt.verify(auth.slice(7), jwtSecret);
    const user = await User.findById(payload.id);
    if (!user || !user.isActive) throw new ApiError(401, 'User is inactive or no longer exists', 'UNAUTHORIZED');
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(401, 'Invalid or expired authentication token', 'INVALID_TOKEN');
  }
});
