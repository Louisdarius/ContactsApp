const Contact = require("../models/contact");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    !contacts && res.json({ message: "No contacts found" });

    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    !contact && res.status(301).send();
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const createContact = async (req, res, next) => {
  const contact = new Contact({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await contact.save();
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body
    );
    !contact && res.status(301).send();
    res.status(201).send("Update successful");
  } catch (e) {
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndRemove({
      _id: req.params.id,
      owner: req.user._id,
    });
    !contact && res.status(301).send("Cannot remove contact");
    res.status(201).send("Remove successful");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
