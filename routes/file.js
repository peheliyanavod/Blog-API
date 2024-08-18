const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const {fileController} = require("../controller");
const upload = require("../middleware/upload")


router.post("/upload", isAuth, upload.single("image"), fileController.uploadFile);

module.exports = router;
