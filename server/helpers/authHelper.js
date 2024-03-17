const bcrypt = require("bcrypt");


const hashPassword = async (psw) => {
    try {
        const hashedPassowrd = await bcrypt.hash(psw , 10);
        return hashedPassowrd;
    } catch (error) {
        console.log("Error at authHelper , ", error)
    }
}
const comparePassword = async (psw , hashedPassowrd) => {
    return bcrypt.compare(psw, hashedPassowrd)
}



module.exports = {hashPassword , comparePassword}