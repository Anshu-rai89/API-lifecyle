const express = require("express");
const port = 3000;
const app = express();
const db = require("./config/mongoose");

app.use(express.json());
app.use(express.urlencoded());
app.use("/", require("./routes"));
app.listen(port, () => console.log("Server is Up and running at", port));
