const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
    const secret = process.env.SECRET;
    return jwt.sign(
        user,
        secret, {
            expiresIn: "10h"
        });
};
const verifyToken = (token) => {
    try {
        console.log("AUTH HIT");
        const secret = process.env.SECRET;
        const payload = jwt.verify(token, secret);
        return {
            message: "success",
            payload: payload
        };
    } catch (error) {
        return {
            message: "failed",
            payload: error
        };
    }

};

module.exports = {
    createToken,
    verifyToken
}