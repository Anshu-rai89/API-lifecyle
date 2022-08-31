const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
mongoose.connect(uri); // local mongo db server
const db = mongoose.connection;

db.once("error", (error) => console.error("Error connecting to DB", error));
db.once("open", () => console.log("Connected to DB"));

module.exports= db;
