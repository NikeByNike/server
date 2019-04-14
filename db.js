const mongoose = require('mongoose');

exports.connect = (url, done) => {
  mongoose.connect(url, { useNewUrlParser: true }).then(
    () => done(),
    err => done(err)
  );
};