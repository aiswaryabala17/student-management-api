/**
 * Global Error Handling Middleware
 */

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  // MySQL specific errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry detected (Email or Student ID already exists).',
      error: err.sqlMessage || err.message
    });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      message: 'Database service is temporarily unavailable.',
      error: err.message
    });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found.`
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
