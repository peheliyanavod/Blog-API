const express = require("express");
const router = express.Router();
const {authController} = require("../controller");
const {signupValidator, signinValidator,emailValidator, verifyUserValidator} = require("../validators/auth");
const validate = require("../validators/validate");

router.post("/signup", signupValidator, validate, authController.signup);

router.post("/signin", signinValidator, validate, authController.signin);

router.post("/sendVerificationCode", emailValidator, validate, authController.verifyCode);

router.post("/verifyUser", verifyUserValidator, validate, authController.verifyUser);

module.exports = router;
