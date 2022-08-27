const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.home);
router.post("/post", postController.createPost);

router.use("/todo", require("./todo"));
router.use("/user", require("./user"));
module.exports = router;
