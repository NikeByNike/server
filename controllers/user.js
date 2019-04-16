const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).send({
          message: "Mail exist"
        });
      } else {
        bcrypt
          .hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
              });
              user.save().then(data => {
                console.log(user);
                res.status(201).send({
                  message: "User created"
                });
              })
                .catch(err => {
                return res.status(500).send(err);
              });
            }
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      }
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec()
    .then(user => {
      if (!user) {
        return res.status(401).send({
          message: "Login failed"
        })
      }
      bcrypt.compare(req.body.password, user.password, (err, status) => {
        if (err) {
          return res.status(401).send({
            message: "Login failed"
          })
        }
        if (!status) {
          return res.status(401).send({
            message: "Login failed"
          })
        } else {
          const token = jwt.sign({
            email: user.email,
            userId: user._id,
            role: user.role
          }, process.env.JWT_KEY, {
            expiresIn: "1h"
          });
          return res.status(200).send({
            message: "Login success",
            token: token
          })
        }
      })
    })
    .catch(err => {
    return res.status(500).send(err);
  });
};

exports.delete = (req, res) => {
  User.deleteOne({_id: req.params.userId}).exec()
    .then(data => {
      if (data.deletedCount === 1) {
        return res.status(200).send({
          message: "User deleted",
        })
      }
      res.status(404).send({
        message: "No such user",
      })
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
