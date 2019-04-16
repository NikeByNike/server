const express = require('express');
const checkAdmin = require("../middleware/check-admin");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.delete("/:userId", checkAdmin, userController.delete);

module.exports = router;