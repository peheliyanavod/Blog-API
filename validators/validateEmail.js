const validateEmail = (email) => {
    const result = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return result;
}

module.exports = validateEmail;