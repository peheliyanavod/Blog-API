const bcrypt = require("bcryptjs");
const hashPassword = require("./hashPassword");

const comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}

module.exports = comparePassword;