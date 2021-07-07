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
    const { username, password } = req.body;
    const user = await User.find({ username });
    console.log("LOGIN Route", user);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user._id }, privateKey, {
          expiresIn: "24h",
        });
        res.status(200).json({
          success: true,
          token: token,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        msg: "Incorrect username or password",
      });
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      msg: "Incorrect username or password",
    });
  }
});

module.exports = router;