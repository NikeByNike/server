const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).send({
      message: "Forbidden"
    })
  }
  try {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (e) {
    return res.status(401).send({
      message: "token expires"
    })
  }
};