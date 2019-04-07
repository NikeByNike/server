const ObjId = require('mongodb').ObjectID;
const db = require('../db');

exports.all = (callback) => {
  db.get().collection("products").find().toArray((err, data) => {
    callback(err, data);
  })
};

exports.findById = (id, callback) => {
  db.get().collection("products").findOne({_id: ObjId(id)}, (err, data) => {
    callback(err, data);
  })
};

exports.create = (product, callback) => {
  db.get().collection("products").insertOne(product, (err, data) => {
    callback(err, data);
  })
};

exports.update = (id, product, callback) => {
  db.get().collection("products").updateOne({_id: ObjId(id)}, {$set:product}, (err, data) => {
    callback(err, data);
  })
};

exports.delete = (id, callback) => {
  db.get().collection("products").deleteOne({_id: ObjId(id)}, (err, data) => {
    callback(err, data);
  })
};