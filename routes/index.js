const express = require("express");
const todo = require("./todo");
const userRoute = require('./user.js');
const  router = express.Router();

router.use("/todo", todo);
router.use("/user", userRoute);
module.exports= router;
