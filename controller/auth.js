const { User } = require("../models");
const hashPassword = require("../utils/hashPassword")

const signup = async (req, res, next) => {
    try {
        const {name,email,password,role} = req.body;

        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            res.code = 400;
            throw new Error("Email already exist");
        }

       

        if(!name){
            res.code = 400;
            throw new Error("Name is required");
        }

        if(!email){
            res.code = 400;
            throw new Error("Email is required");
        }

        if(!password){
            res.code = 400;
            throw new Error("Password is required");
        }

        if(password.length<6){
            res.code = 400;
            throw new Error("Password should be 6 char long");
        }

        const hashedPassword =await hashPassword(password);

        const newUser = new User({name, email, password:hashedPassword, role});

        await newUser.save();

        res.status(203).json({code: 201, status: true, message: "User registerd successfully"});

    } catch (error) {
        next(error);
    }
}

module.exports = {signup};