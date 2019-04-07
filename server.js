const bodyParser = require('body-parser');
const ObjId = require('mongodb').ObjectID;
const express = require('express');

const db = require('./db');
const productsController = require("./controllers/products");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.get("/products", productsController.all);

app.post("/products", productsController.create);

app.get("/products/:id", productsController.findById);

app.put("/products/:id", productsController.update);

app.delete("/products/:id", productsController.delete);

const url = 'mongodb://localhost:27017';
const dbName = 'myAPI';

db.connect(url, dbName, (err) => {
  if (err) {
    console.log(err);
  }
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});