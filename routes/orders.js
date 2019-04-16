const express = require('express');
const checkAdmin = require("../middleware/check-admin");

const router = express.Router();

const ordersController = require("../controllers/orders");

router.get("/", ordersController.all);

router.post("/", checkAdmin, ordersController.create);

router.get("/:id", ordersController.findById);

router.put("/:id", checkAdmin, ordersController.update);

router.delete("/:id", checkAdmin, ordersController.delete);

module.exports = router;