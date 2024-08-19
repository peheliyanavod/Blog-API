const path = require("path");
const {validateExtention} = require("../validators/file");
const {uploadFileToS3} = require("../utils/awsS3");

const uploadFile = async (req, res, next) => {
    try {
        const {file} = req;

        if(!file){
            res.code = 400;
            throw new Error("File is not selected");
        }

        const ext = path.extname(file.originalname);
        const isValidExt = validateExtention(ext);

        if(!isValidExt){
            res.code = 400;
            throw new Error("Only .jpg .jpeg .png format allowed");
        }

        const key = await uploadFileToS3({file, ext});
        res.status(201).json({code: 201, status: true, message: "File uploaded successfully", data: {key}})
    } catch (error) {
        next(error);
    }
}

module.exports = {uploadFile};