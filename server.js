const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectID;
var express = require('express');

var app = express();

let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.get("/products", (req, res) => {
  db.collection("products").find().toArray((err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(data);
  });
});

app.get("/products/:id", (req, res) => {
  db.collection("products").findOne({_id: ObjId(req.params.id)}, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(data);
  });
});

app.post("/products", (req, res) => {
  const product = {
    title: req.body.title,
  };
  db.collection("products").insertOne(product, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(product);
  });
});

app.delete("/products/:id", (req, res) => {
  db.collection("products").deleteOne({_id: ObjId(req.params.id)}, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

const url = 'mongodb://localhost:27017';

const dbName = 'myAPI';

const client = new MongoClient(url, { useNewUrlParser: true } );

client.connect((err, client) => {
  if (err) {
    console.log(err);
  }
  db = client.db(dbName);
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});