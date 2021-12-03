function ErrorHandler(error, req, res, next) {
  let { message, statusCode = 500, status = 'error' } = error;

  if (statusCode === 500) {
    message = 'Internal Server Error';
  }

  return res.status(statusCode).send({ status, message });
}

function errorWrapper(func) {
  return function (req, res, next) {
    func(req, res, next).catch(next);
  };
}

module.exports = { ErrorHandler, errorWrapper };
