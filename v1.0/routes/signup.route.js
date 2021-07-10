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
    const { username, email, password } = req.body;

    // Hash password and save
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    //generate token
    const token = jwt.sign({ userId: savedUser._id }, privateKey, {
      expiresIn: "24h",
    });
    res.status(201).json({
      success: true,
      message: "Signup Successful",
      token: token,
      user: savedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "Signup unsuccessful" });
  }
});

module.exports = router;
