const mongoose = require("mongoose"),
  env = require("./configEnv");
module.exports = mongoose.connect(env.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
