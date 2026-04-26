const express = require("express");
const router = express.Router();
const expenseController = require("../CONTROLLERS/expenseController");
const { auth } = require("../middlewares/auth");

router.post("/addexpense", auth, expenseController.addexpense);
router.post("/getexpenses", auth, expenseController.getexpenses);
router.post("/updateexpense/", auth, expenseController.updateexpense);

module.exports = router;