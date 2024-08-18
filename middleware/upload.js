const multer = require("multer");
const path = require("path");
const generateCode = require("../utils/generateCode")

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null,"./upload")
    },
    filename: (req, file, callback) => {
        //original_file_name_12_digit_random_number.ext
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const filename = originalName.replace(extension, "");
        const compressedFilename = filename.split(" ").join("_");
        const lowercaseFilename = compressedFilename.toLocaleLowerCase();
        const code = generateCode(12);
        const finalFile = `${lowercaseFilename}_${code}_${extension}`;
        
        callback(null, finalFile);
    }
})

const upload = multer({
    storage,
    fileFilter: (res, file, callback) => {
        const mimetype = file.mimetype;

        if(mimetype === "image/jpg" || mimetype === "image/jpeg" || mimetype === "image/png" || mimetype === "application/pdf"){
            callback(null, true);
        }
        else{
            callback(new Error("Only .jpg .jpeg .png or .pdf format is allowed"));
        }
    }
});

module.exports = upload;