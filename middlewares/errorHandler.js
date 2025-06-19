const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      name: err.name || 'Error',
      message,
    },
  });
};

module.exports = errorHandler;