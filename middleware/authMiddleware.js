const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

function authMiddleware(req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.verifiedAddress = decode.address;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = authMiddleware;
