const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'DEVELOPMENT' ? err.stack : undefine
  })
}

module.exports = errorHandler;
