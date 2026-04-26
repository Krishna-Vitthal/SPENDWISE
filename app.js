require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./ROUTES/userRoutes");
const groupRoutes = require("./ROUTES/groupRoutes");
const expenseRoutes = require("./ROUTES/expenseRoutes")
require('./CONFIG/passport')
const googleRoutes = require("./ROUTES/googleAuth")
const { group } = require("node:console");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(passport.initialize());
app.use((req, res, next) => {
    console.log("REQ:", req.method, req.url);
    next();
});
app.use("/user", userRoutes);
app.use("/group", groupRoutes);
app.use("/auth", googleRoutes);
console.log("checkpoint");
app.use("/expense", expenseRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});