const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already exist");
    }

    if (!name) {
      res.code = 400;
      throw new Error("Name is required");
    }

    if (!email) {
      res.code = 400;
      throw new Error("Email is required");
    }

    if (!password) {
      res.code = 400;
      throw new Error("Password is required");
    }

    if (password.length < 6) {
      res.code = 400;
      throw new Error("Password should be 6 char long");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();

    res
      .status(203)
      .json({
        code: 201,
        status: true,
        message: "User registerd successfully",
      });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    res
      .status(200)
      .json({
        code: 200,
        status: true,
        message: "User signin successfully",
        data: { token },
      });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.code = 404;
            throw new Error("User not found");
        }

        if(user.isVerified){
            res.code = 400;
            throw new Error("User already verified")
        }

        const code = generateCode(6);

        user.verificationCode = code;
        await user.save();

        // send email
        await sendEmail({
          emailTo:user.email,
          subject: "Email verification code",
          code,
          content: "Verify your account",
        });

        res.status(200).json({code: 200, status: true, message: "User verification code send successfully"});
    } catch (error) {
        next(error);
    }
}

const verifyUser = async (req, res, next) => {
  try {
    const {email, code} = req.body;

    const user = await User.findOne({email});
    if(!user){
      res.code = 400;
      throw new Error("User nor found");
    }

    if(user.verificationCode != code){
      res.code = 400;
      throw new Error("Invalid Code");
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({code: 200, status: true, message: "User verified successfully" });

  } catch (error) {
    next(error);
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const {email} = req.body;

    const user = await User.findOne({email});
    if(!user){
      res.code = 400;
      throw new Error("User not found");
    }

    const code = generateCode(6);

    user.forgotPassword = code;
    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: "Forgot password code",
      code,
      content: "Change your password"
    });

    res.status(200).json({code: 200, status: true, message: "Forgot password code send successfully"});
  
  }
  catch (error) {
    next(error);
  }
}

const recoverPassword =async (req, res, next) => {
  try {
    const {email, code, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      res.code = 400;
      throw new Error("User not found");
    }

    if(user.forgotPassword !== code){
      res.code = 400;
      throw new Error("Invalid code")
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgotPassword = null;
    await user.save();

    res.status(200).json({code: 200, status: true, message: "Password recovered successfully"});
  } 
  catch (error) {
    next(error);
  }
}

module.exports = { signup, signin, verifyCode, verifyUser, forgotPassword, recoverPassword };
