const { userSchema } = require("../CONFIG/validation");

const validate = (req, res, next) => {
    const result = userSchema.safeParse(req.body);

    if (result.error) {
        console.log('Zod error object:', result.error);
        const arr = [];
        for (const issue of result.error.issues) {
            arr.push(issue.message);
        }
        return res.status(400).json({
            message: "Validation failed",
            errors: arr
        });
    }

    req.validatedBody = result.data;
    req.body = result.data;
    return next();
};

module.exports = { validate };