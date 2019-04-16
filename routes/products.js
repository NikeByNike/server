const express = require('express');
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const upload = multer({storage: storage});

const router = express.Router();

const productsController = require("../controllers/products");

router.get("/", productsController.all);

router.post("/", checkAuth, upload.single("img"), productsController.create);

router.get("/:id", productsController.findById);

router.put("/:id", checkAuth, productsController.update);

router.delete("/:id", checkAuth, productsController.delete);

module.exports = router;