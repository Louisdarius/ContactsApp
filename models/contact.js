const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  company: {
    type: String,
    required: false,
  },
  phone: {
    mobile: {
      type: String,
      required: [true, "Mobile Number is required"],
    },
    telephone: Number,
    work: Number,
    school: Number,
    fax: Number,
  },
  email: String,
  url: String,
  address: {
    houseNumber: Number,
    street: String,
    city: String,
    county: String,
    postcode: String,
    country: String,
  },
  socialProfile: {
    twitter: String,
    facebook: String,
    instagram: String,
    linkedIn: String,
  },
  note: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner is required"],
  },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
