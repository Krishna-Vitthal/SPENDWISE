const express = require("express");
const passport = require("passport");
const { createToken } = require("../services/tokenRelated");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/login?error=oauth",
        session: false
    }),
    (req, res) => {
        const token = createToken(req.user);
        res.redirect(`http://localhost:5173/oauth/success?token=${token}`);
    }
);

module.exports = router;