
const app = require("./app.js");
require("dotenv").config();
const db = require("./config/mongoose.js");
const port = process.env.PORT || 5000;


app.listen(port, () => console.log("Server is Up and running at", port));
