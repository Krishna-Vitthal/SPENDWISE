const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            const checkUser = await prisma.user.findUnique({
                where: {
                    email: profile.emails[0].value
                }
            });
            if (checkUser) {
                return done(null, checkUser);

            } else {
                const randomPass = crypto.randomUUID();
                const hashedpass = await bcrypt.hash(randomPass, 10);
                const uid = await crypto.randomUUID();
                const newUser = await prisma.user.create({
                    data: {
                        email: profile.emails[0].value,
                        password: hashedpass,
                        userid: uid,
                        googleid: profile.id
                    }
                });
                return done(null, newUser);
            }
        } catch (error) {
            return done(error, null);
        }
    }
));