const express = require('express');
const router = express.Router();

const ordersController = require("../controllers/orders");

router.get("/", ordersController.all);

router.post("/", ordersController.create);

router.get("/:id", ordersController.findById);

router.put("/:id", ordersController.update);

router.delete("/:id", ordersController.delete);

module.exports = router;