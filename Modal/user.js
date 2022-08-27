const mongoose = require("mongoose");

const userScehema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Todos",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userScehema);
module.exports = User;
