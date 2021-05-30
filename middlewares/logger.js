function logger(req, res, next){
  console.log("#### LOGGING");
  console.log("REQUEST METHOD:", req.method);
  console.log("REQUEST BODY:", req.body);
  next();
}

module.exports = {logger};