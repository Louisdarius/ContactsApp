const Router = require("express").Router(),
  auth = require("../middlewares/auth"),
  contactController = require("../controllers/contact");

Router.route("/")
  .get(auth, contactController.getContacts)
  .post(auth, contactController.createContact);

Router.route("/:id")
  .get(auth, contactController.getContact)
  .patch(auth, contactController.updateContact)
  .delete(auth, contactController.deleteContact);

module.exports = Router;
