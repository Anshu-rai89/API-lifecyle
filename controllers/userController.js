const User = require("../Modal/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require('../utils/constants')
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body,
      errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        data: "Email already exist.Please login",
      });
    }

    // user is null
    // this is first time user lets register it in our system

    // You need to generate a salt
    // you need to hash password using salt

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashPassword,
      userName,
    });

    const token = jwt.sign(
      {
        email: email,
        userId: newUser.id,
      },
      "secretKey"
    );

    return res.status(200).json({
      success: true,
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.error("Error while creating user", error);
    return res.status(500).json({
      success: false,
      data: [],
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        data: "You are not registered user. Please signup to continue",
      });
    }

    // password that user have given to the password of the user that is there in our db
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.staus(400).json({
        success: false,
        data: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign({
      email: email,
      userId:user.id
    },JWT_SECRET_KEY);

    return res.status(200).json({
      success: true,
      data: {
        token: token,
        msg: "Signed in successfully.",
      },
    });
  } catch (error) {
    console.error("Error while creating user", error);
    return res.status(500).json({
      success: false,
      data: [],
    });
  }
};
