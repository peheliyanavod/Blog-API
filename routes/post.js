const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const {postController} = require("../controller");
const {addPostValidator, updatePostValidator, idValidator} = require("../validators/post");
const validate = require("../validators/validate");

router.post("/", isAuth, addPostValidator, validate, postController.addPost)

router.put("/:id", isAuth, updatePostValidator, idValidator, validate, postController.updatePost);

router.delete("/:id", isAuth ,idValidator, validate, postController.deletePost);

router.get("/", isAuth, postController.getPosts);

module.exports = router;