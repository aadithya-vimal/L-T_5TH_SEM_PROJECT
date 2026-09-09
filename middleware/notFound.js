module.exports = (req, _res, next) => next(Object.assign(new Error(`Route ${req.method} ${req.originalUrl} not found`), { statusCode: 404, errorCode: 'NOT_FOUND' }));
