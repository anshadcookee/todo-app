//middleware
const jwt = require("jsonwebtoken");

const athenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secret", {expiresIn: '1hr'},(err, decoded) => {
    if (err) {
      console.log(err);
      res.status(403).json({ message: "invalid token" });
    }
    req.userId = decoded.user;
    next();
  });
};
module.exports = { athenticateToken };
