let jwt = require("jsonwebtoken");
let userModel = require("../models/user.model");

let authMiddelwere = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;
 
    if (!accessToken)
      return res.status(401).json({
        message: "Unauthorized request",
      });

    let decode = jwt.verify( accessToken, process.env.JWT_ACCESS_SECRET);
    
    if (!decode)
      return res.status(401).json({
        message: "Unauthorized request",
      });

    let user = await userModel.findOne(decode._Id);
    req.user = user;
    next();

  } catch (error) {
    return res.status(404).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {authMiddelwere}
