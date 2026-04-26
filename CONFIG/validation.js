const z = require("zod");

const userSchema = z.object({
    email: z.string().trim().email({
        message: "Invalid email address"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }).max(16, {
        message: "Password must be at most 16 characters long"
    })
});

module.exports = { userSchema };