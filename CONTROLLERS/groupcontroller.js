const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const creategroup = async(req, res) => {
    try {
        const { name } = req.body;
        const user = req.ValidatedBody.user;
        const code = Math.random().toString(36).substring(2, 8);
        const data = await prisma.group.create({
            data: {
                name: name,
                groupID: code,
                user: {
                    connect: {
                        userid: user.userid
                    }
                }
            }
        });
        if (data) {
            return res.status(201).json({ message: "success", groupID: code });
        }
    } catch (error) {
        return res.status(500).json({ message: "failed", error: error.message });
    }
};



const joingroup = async(req, res) => {
    try {
        const user = req.ValidatedBody;
        const { groupID } = req.body;
        const data = await prisma.group.update({
            where: {
                groupID: groupID
            },
            data: {
                user: {
                    connect: {
                        userid: user.userid
                    }
                }
            }
        });
        if (data) {
            return res.status(200).json({ message: "User joined group successfully", groupID });
        }
    } catch (error) {
        return res.status(500).json({ message: "failed", error: error.message });
    }
};
module.exports = { creategroup, joingroup };