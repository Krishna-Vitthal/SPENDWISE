const express = require("express");
const router = express.Router();
const userController = require("../CONTROLLERS/usercontroller");
const { validate } = require("../middlewares/checking");

router.post("/register", validate, userController.userRegister);
router.post("/login", validate, userController.userLogin);

module.exports = router;