const express = require("express");
const router = express.Router();
const groupController = require("../CONTROLLERS/groupcontroller");
const { auth } = require("../middlewares/auth");

router.post("/creategroup", auth, groupController.creategroup);
router.post("/joingroup", auth, groupController.joingroup);
module.exports = router;