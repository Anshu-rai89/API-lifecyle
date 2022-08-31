const express = require("express");
const { body } = require("express-validator");
const {registerUser,login} = require("../controllers/userController.js");
const router = express.Router();
router.post(
  "/register",
  body("email").notEmpty().isEmail(),
  body("password").isLength({ min: 6 }).isAlphanumeric(),
  body("userName").notEmpty().isLength({min:5}),
registerUser
);
router.post("/login",
    body('email').notEmpty().isEmail(),
    body('password').isLength({min:6}).isAlphanumeric(),
  login);
  
  module.exports=router;
