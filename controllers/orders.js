const Orders = require("../models/orders");

exports.all = (req, res) => {
  Orders.all()
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
  Orders.findById(req)
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
  Orders.create(req)
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
  Orders.update(req)
    .then(data => res.send(data))
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.delete = (req, res) => {
  Orders.delete(req)
    .then(data => res.send(data))
    .catch(err => {
      return res.status(500).send(err);
    });
};