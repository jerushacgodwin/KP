const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
module.exports.authToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split("")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decode.id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
