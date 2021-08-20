const jwt = require("jsonwebtoken"),
  User = require("../models/user"),
  variables = require("../configEnv");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = await jwt.verify(token, variables.tokenSecret);
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });
    !user && res.status(301).send("Cannot authenticate");

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = authenticate;
