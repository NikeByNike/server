const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
  quantity: { type: Number, default: 1},
});
const Order = mongoose.model("Order", orderSchema);

exports.all = () => {
  return Order.find().select("product quantity _id").exec();
};

exports.findById = (req) => {
  return Order.findById(req.params.id).select("product quantity _id").exec();
};

exports.create = (req) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.product,
    quantity: req.body.quantity,
  });
  return order.save();
};

exports.update = (req) => {
  let updateFields = {};
  Object.entries(req.body).map(item => updateFields[item[0]] = item[1]);
  return Order.updateOne({_id: req.params.id}, { $set:updateFields}).exec();
};

exports.delete = (req) => {
  return Order.deleteOne({_id: req.params.id}).exec();
};