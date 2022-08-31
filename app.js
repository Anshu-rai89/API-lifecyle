const express = require('express');
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded());
app.use("/", require('./routes'));

module.exports= app;
