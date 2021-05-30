function routeNotFoundHandler(req, res, next){
  console.error("ERROR: Sorry can't find that route!");
  res.status(404).json({errMsg: "Sorry can't find that route!"});
}

module.exports = {routeNotFoundHandler};