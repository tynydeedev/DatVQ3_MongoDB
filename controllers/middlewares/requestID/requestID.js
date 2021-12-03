module.exports = function (req, res, next) {
  res.locals.requestId = Date.now() + Math.floor(Math.random() * 1000).toString(16);
  next();
};
