const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true},
  price: { type: Number, required: true},
});
const Product = mongoose.model("Product", productSchema);

exports.all = () => {
  return Product.find().select("name price _id").exec();
};

exports.findById = (req) => {
  return Product.findById(req.params.id).select("name price _id").exec();
};

exports.create = (req) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  return product.save();
};

exports.update = (req) => {
  let updateFields = {};
  Object.entries(req.body).map(item => updateFields[item[0]] = item[1]);
  return Product.updateOne({_id: req.params.id}, { $set:updateFields}).exec();
};

exports.delete = (req) => {
  return Product.deleteOne({_id: req.params.id}).exec();
};