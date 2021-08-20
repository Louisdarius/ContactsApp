const Router = require("express").Router(),
  auth = require("../middlewares/auth"),
  userController = require("../controllers/user");

Router.route("/")
  .post(userController.register)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

Router.post("/login", userController.login);
Router.post("/logout", auth, userController.logout);
Router.post("/logoutAll", auth, userController.logoutAll);

module.exports = Router;
