const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true},
  price: { type: Number, required: true},
  img: {type: String, default: "/uploads/default.jpg"}
});

module.exports = mongoose.model("Product", productSchema);