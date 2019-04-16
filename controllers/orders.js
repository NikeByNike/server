const mongoose = require('mongoose');

const Order = require("../models/order");

exports.all = (req, res) => {
  Order.find()
  .select("product quantity _id")
  .populate("product", "name price")
  .exec()
  .then(data => {
    if (data.length === 0) {
      return res.status(404).send({message: "No orders"});
    }
    const response = {
      count: data.length,
      orders: data
    };
    res.send(response);
  })
  .catch(err => {
    return res.status(500).send(err);
  });
};

exports.findById = (req, res) => {
  Order.findById(req.params.id)
  .select("product quantity _id")
  .populate("product", "name price")
  .exec()
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      return res.status(404).send({
        message: "Order with such id not found",
      });
    }
  })
  .catch(err => {
    return res.status(500).send(err);
  });
};

exports.create = (req, res) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.product,
    quantity: req.body.quantity,
  });
  order.save()
  .then(data => {
    res.send({
      _id: data._id,
      product: data.product,
      quantity: data.quantity
    });
  })
  .catch(err => {
    return res.status(500).send(err);
  });
};

exports.update = (req, res) => {
  let updateFields = {};
  Object.entries(req.body).map(item => updateFields[item[0]] = item[1]);
  Order.updateOne({_id: req.params.id}, { $set:updateFields}).exec()
  .then(data => res.send(data))
  .catch(err => {
    return res.status(500).send(err);
  });
};

exports.delete = (req, res) => {
  Order.deleteOne({_id: req.params.id}).exec()
  .then(data => res.send(data))
  .catch(err => {
    return res.status(500).send(err);
    });
};