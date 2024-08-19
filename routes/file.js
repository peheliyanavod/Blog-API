const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const fileController = require("../controller/file");
const upload = require("../middleware/upload")


router.post("/upload", isAuth, upload.single("image"), fileController.uploadFile);

router.get("/signedUrl", isAuth, fileController.getSignedUrl);

router.delete("/deleteFile", isAuth, fileController.deleteFile);

module.exports = router;
