const mongoose = require("mongoose");
const uri = 'mongodb+srv://anshu1:anshu12345@anshudb.bsqv6aj.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(uri); // local mongo db server

const db = mongoose.connection;

db.once("error", (error) => console.error("Error connecting to DB", error));
db.once("open", () => console.log("Coonected to DB"));

module.exports = db;
