const http = require("http");
const db = require('./db');
const app = require("./app");

const port = process.env.Port || 3000;

const server = http.createServer(app);

const url = 'mongodb://localhost:27017/myAPI';

db.connect(url, (err) => {
  if (err) {
    console.log(err);
  }
  server.listen(port,() => {
    console.log(`App listening on port ${port}!`);
  });
});