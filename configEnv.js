require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  url: process.env.URL,
  message: process.env.MESSAGE,
  salt: process.env.SALT,
  tokenSecret: process.env.TOKENSECRET,
};
