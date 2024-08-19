const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const {postController} = require("../controller");
const {addPostValidator} = require("../validators/post");
const validate = require("../validators/validate");

router.post("/", isAuth, addPostValidator, validate, postController.addPost)

module.exports = router;