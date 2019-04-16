const express = require('express');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const ordersController = require("../controllers/orders");

router.get("/", ordersController.all);

router.post("/", checkAuth, ordersController.create);

router.get("/:id", ordersController.findById);

router.put("/:id", checkAuth, ordersController.update);

router.delete("/:id", checkAuth, ordersController.delete);

module.exports = router;