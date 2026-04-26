const { PrismaClient } = require("@prisma/client");
const { ca } = require("zod/locales");
const prisma = new PrismaClient();

const getexpenses = async(req, res) => {
    try {
        const userid = req.ValidatedBody.userid;
        const filter = req.body || {};

        const where = {
            userid: userid
        };

        // category filter
        if (Array.isArray(filter.category) && filter.category.length > 0) {
            where.category = { in: filter.category };
        }

        // type filter
        if (filter.type && filter.type !== "All") {
            where.type = filter.type;
        }

        // date filter
        if (filter.startDate || filter.endDate) {
            where.date = {};
            if (filter.startDate) where.date.gte = new Date(filter.startDate);
            if (filter.endDate) where.date.lte = new Date(filter.endDate);
        }

        // 🔥 ALWAYS RUN QUERY
        const data = await prisma.expense.findMany({
            where,
            orderBy: { date: "desc" }
        });

        return res.status(200).json({ message: "success", data });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "failed", error: error.message });
    }
};
const addexpense = async(req, res) => {
    console.log("1️⃣ Controller hit");

    try {
        console.log("2️⃣ Before reading user");
        const user = req.ValidatedBody.userid;
        console.log("USER:", user);

        console.log("3️⃣ Before reading body");
        const { amount, category, date, method, type } = req.body;
        console.log("BODY:", req.body);

        console.log("4️⃣ Before Prisma call");

        const dat = await prisma.expense.create({
            data: {
                amount: parseFloat(amount),
                category,
                date: new Date(date),
                method,
                type,
                userid: user

            }
        });

        console.log("5️⃣ After Prisma call", dat);

        return res.status(201).json({ message: "success", data: dat });

    } catch (error) {
        console.log("❌ ERROR BLOCK HIT");
        console.error(error);
        return res.status(500).json({ message: "failed", error: error.message });
    }
};
const updateexpense = async(req, res) => {};
module.exports = { getexpenses, addexpense, updateexpense }