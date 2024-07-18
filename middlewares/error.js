
//
const errorHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

// Error handling for development
const sendErrorDev = (err, res) => {
  res.status(err.status).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

//Error handling for production
const sendErrorProd = (err, res) => {
  res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = errorHandler;
