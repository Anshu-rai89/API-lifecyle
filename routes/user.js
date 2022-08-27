const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const userController = require("../controllers/userController");
router.post(
  "/register",
  body("email").notEmpty().isEmail(),
  body("password").isLength({ min: 6 }).isAlphanumeric(),
  body("userName").notEmpty().isLength({min:5}),
  userController.registerUser
);
router.post("/login",
    body('email').notEmpty().isEmail(),
    body('password').isLength({min:6}).isAlphanumeric(),
    userController.login);
module.exports = router;
