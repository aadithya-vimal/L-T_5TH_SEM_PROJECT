const ApiError = require('../utils/ApiError');
module.exports = (req, _res, next) => {
  const errors = req.validationErrors || [];
  if (errors.length) return next(new ApiError(400, errors.map(e => e.msg).join('; '), 'VALIDATION_ERROR'));
  next();
};
