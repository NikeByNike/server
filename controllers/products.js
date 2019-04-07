const Products = require("../models/products");

exports.all = (req, res) => {
  Products.all((err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(data);
  })
};

exports.findById = (req, res) => {
  Products.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(data);
  })
};

exports.create = (req, res) => {
  const product = {
    title: req.body.title,
  };
  Products.create(product, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(product);
  })
};

exports.update = (req, res) => {
  const product = {
    title: req.body.title,
  };
  Products.update(req.params.id, product, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  })
};

exports.delete = (req, res) => {
  Products.delete(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  })
};