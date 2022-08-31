const express = require("express");
const { body, param } = require("express-validator");
const { verifyToken } = require ("../utils");
const {updateTodo,deleteTodo,createTodo,getTodo} = require("../controllers/todo");
const todoRouter = express.Router();

todoRouter.get("/", verifyToken, getTodo);
todoRouter.post(
  "/",
  verifyToken,
  body("text").isEmpty(),
  body("userId").isEmpty(),
  createTodo
);
todoRouter.put(
  "/:id",
  verifyToken,
  body("text").isEmpty(),
  body("userId").isEmpty(),
  param("id").isMongoId(),
  updateTodo
);
todoRouter.delete("/:id", verifyToken, deleteTodo);

module.exports= todoRouter;