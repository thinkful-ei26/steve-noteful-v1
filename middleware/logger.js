const logger = function(req, res, next) {
  console.log('date is: ', Date());
  console.log('request is', req.method);
  console.log('url is', req.url);
  next();
};

module.exports = logger;
