function errorHandler(err, req, res, next){
  console.error(err.stack);
  res.status(500).json({errMsg: "Something Broke on Server!"});
  next();
}

module.exports = {errorHandler};