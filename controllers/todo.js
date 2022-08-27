const mongoose = require("mongoose");
const Todo = require("../Modal/todo");

module.exports.getTodo = async (req, res) => {
  try {
    // I have to fetch all todos from databasse And send it back
    const todos = await Todo.find({ user: req.body.userId });

    return res.status(200).json({
      success: true,
      msg: "Todos Fetched successfully",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      data: [],
    });
  }
};

module.exports.createTodo = async (req, res) => {
  try {
    const todoDataFromClient = req.body || {};
    // I have to fetch all todos from databasse And send it back
    const todo = await Todo.create({
      text: todoDataFromClient.text,
      user:req.body.userId
    });

    return res.status(201).json({
      success: true,
      msg: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      data: [],
    });
  }
};

module.exports.updateTodo = async (req, res) => {
  try {

    const todoUpdatedData = req.body || {};
    const { id } = req.params;

    //First we need to check if there exist a todo with this id
    const todo = await Todo.findById(id);
    // we can update the todo

    if (!todo) {
      return res.status(400).json({
        success: false,
        msg: "Todo Dosnt exist",
        data: [],
      });
    }

    // console.log("User",req.body.userId,todo.user.toString());
    // // Check if this todo was created by user who is trying to update 
    // if(req.body.userId!==todo.user) {  Object("63eghfjfhfhjfhgfv") === "hjdsdshcvjdhdjvh"
    //   return res.status(403).json({
    //     success:false,
    //     msg:"You are not authorized to perform update todo."
    //   })
    // }

    await Todo.findByIdAndUpdate(id, {
      text: todoUpdatedData.text,
    });

    return res.status(200).json({
      success: true,
      msg: "Todo updated successfully",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      data: [],
    });
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    //First we need to check if there exist a todo with this id
    const todo = await Todo.findById(id);
    // we can update the todo

    if (!todo) {
      return res.status(400).json({
        success: false,
        msg: "Todo doesn't exist",
        data: [],
      });
    }
    // Check if this todo was created by user who is trying to update
    if (req.body.userId !== todo.user) {
      return res.status(403).json({
        success: false,
        msg: "You are not authorized to perform update todo.",
      });
    }
    await Todo.findOneAndDelete(id);
    return res.status(200).json({
      success: true,
      msg: "Todo deleted successfully",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      data: [],
    });
  }
};
