const mongoose = require('mongoose');

const Product = require("../models/product");

exports.all = (req, res) => {
  Product.find()
  .select("name price _id img")
  .exec()
  .then(data => {
    if (data.length === 0) {
      return res.status(404).send({message: "No products"});
    }
    const response = {
      count: data.length,
      products: data
    };
    res.send(response);
  })
  .catch(err => {
    return res.status(500).send(err);
  });
};

exports.findById = (req, res) => {
  Product.findById(req.params.id)
  .select("name price _id img")
  .exec()
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      return res.status(404).send({
        message: "Product with such id not found",
      });
    }
  })
  .catch(err => {
    return res.status(500).send(err);
  });
};

exports.create = (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    img: req.file && "/" + req.file.path
  });
  product.save()
  .then(data => {
    res.send({
      _id: data._id,
      name: data.name,
      price: data.price,
      img: data.img
    });
  })
  .catch(err => {
    return res.status(500).send(err);
  });
};

exports.update = (req, res) => {
  let updateFields = {};
  Object.entries(req.body).map(item => updateFields[item[0]] = item[1]);
  Product.updateOne({_id: req.params.id}, { $set:updateFields}).exec()
  .then(data => res.send(data))
  .catch(err => {
    return res.status(500).send(err);
  });
};

exports.delete = (req, res) => {
  Product.deleteOne({_id: req.params.id}).exec()
  .then(data => res.send(data))
  .catch(err => {
    return res.status(500).send(err);
  });
};