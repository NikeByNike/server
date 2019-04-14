const Products = require("../models/products");

exports.all = (req, res) => {
  Products.all()
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
  Products.findById(req)
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
  Products.create(req)
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
  Products.update(req)
    .then(data => res.send(data))
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.delete = (req, res) => {
  Products.delete(req)
    .then(data => res.send(data))
    .catch(err => {
      return res.status(500).send(err);
    });
};