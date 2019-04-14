const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");

const app = express();

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.use("/products", productsRoutes);

app.use("/orders", ordersRoutes);

module.exports = app;