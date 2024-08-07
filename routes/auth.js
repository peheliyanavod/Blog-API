const express = require("express");
const router = express.Router();
const {authController} = require("../controller");
const {signupValidator, signinValidator,emailValidator, verifyUserValidator, recoverPasswordValidator, changePasswordValidator} = require("../validators/auth");
const validate = require("../validators/validate");
const isAuth = require("../middleware/isAuth");

router.post("/signup", signupValidator, validate, authController.signup);

router.post("/signin", signinValidator, validate, authController.signin);

router.post("/sendVerificationCode", emailValidator, validate, authController.verifyCode);

router.post("/verifyUser", verifyUserValidator, validate, authController.verifyUser);

router.post("/forgotPassword", emailValidator, validate, authController.forgotPassword);

router.post("/recoverPassword", recoverPasswordValidator, validate, authController.recoverPassword);

router.put("/changePassword",changePasswordValidator, validate, isAuth, authController.changePassword);

module.exports = router;
