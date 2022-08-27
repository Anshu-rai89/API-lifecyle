const express = require("express");
const router = express.Router();
const {body,param} = require('express-validator');
const todoController = require("../controllers/todo");
const { verifyToken } = require("../utils");

router.get("/", verifyToken,todoController.getTodo);
router.post("/", verifyToken,
    body("text").isEmpty(),
    body("userId").isEmpty(),
    todoController.createTodo);
router.put(
  "/:id",
  verifyToken,
  body("text").isEmpty(),
  body("userId").isEmpty(),
 param('id').isMongoId(),
  todoController.updateTodo
);
router.delete("/:id", verifyToken, todoController.deleteTodo);
module.exports = router;
