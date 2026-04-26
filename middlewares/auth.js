const { verifyToken } = require("../services/tokenRelated");

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log("Unauthorized: No Authorization header");
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const { message, payload } = verifyToken(token);
    if (message === "success") {
        console.log("Authorized");
        console.log(payload);
        req.ValidatedBody = payload;
        return next();
    } else {
        console.log("Unauthorized: Invalid token");
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};

module.exports = { auth };