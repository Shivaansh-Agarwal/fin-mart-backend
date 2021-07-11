const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");
const { logger } = require("../../middlewares/logger.js");

const router = express.Router();
const privateKey = process.env["LOGIN_PRIVATE_KEY"];

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(logger);

router.route("/").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const dbResult = await User.find({ 'email': email });
    const user = (dbResult && dbResult.length===1) ? dbResult[0] : null;
    console.log("LOGIN Route", user);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      if (match) {
        const token = jwt.sign({ userId: user._id }, privateKey, {
          expiresIn: "24h",
        });
        res.status(200).json({
          success: true,
          message: "Login Successful!",
          data:{
            token: token,
            user: user
          }
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Incorrect username or password",
    });
  }
});

module.exports = router;