const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createToken } = require("../services/tokenRelated");
const prisma = new PrismaClient({});


const userRegister = async(req, res) => {
    try {
        const payload = req.validatedBody || req.body;
        const { email } = payload;
        let user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (user) {
            return res.status(409).json({
                message: "User already exists"
            });
        } else {
            const hashedpass = await bcrypt.hash(payload.password, 10);
            const uid = await crypto.randomUUID();
            user = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedpass,
                    userid: uid
                }
            });
            if (user) {
                const token = createToken(user);
                return res.status(201).json({ message: "success", token: token });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const userLogin = async(req, res) => {
    try {
        const payload = req.validatedBody || req.body;
        const { email, password } = payload;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user) {
            const ismatch = await bcrypt.compare(password, user.password);
            if (ismatch) {
                const token = createToken(user);
                return res.json({ message: "success", token: token });
            }
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = { userRegister, userLogin };