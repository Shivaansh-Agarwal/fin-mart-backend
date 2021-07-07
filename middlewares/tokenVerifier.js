const jwt = require("jsonwebtoken");

const privateKey = process.env["privateKey"];

function tokenVerifier(req, res, next) {
  console.log("Inside Authorization Middleware");
  const token = req.headers.authorization;
  console.log("## TOKEN: ", token);
  jwt.verify(token, privateKey, function (err, decoded) {
    if (err) {
      console.log("UNAUTHORIZED ACCESS!!");
      console.error("Issue with JWT Token");
      console.error(err.name);
      console.error(err.message);
      res.status(401).json({ message: "Unauthorized Access" });
    } else {
      next();
    }
  });
}

module.exports = { tokenVerifier };
