const mongoose = require("mongoose"),
  variables = require("../configEnv"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  Contact = require("../models/contact"),
  userSchema = new mongoose.Schema({
    name: {
      first: {
        type: String,
        require: [true, "First name is required"],
      },
      last: {
        type: String,
        required: [true, "Last name is required"],
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "An account with that email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  });

userSchema.pre("save", async function (next) {
  this.isModified("password") &&
    (this.password = await bcrypt.hash(this.password, 12));
  next();
});

userSchema.pre("remove", async function (next) {
  // find all contacts by author and removed them using deletemany method
  const contacts = await Contact.deleteMany({ owner: this._id });
  !contacts && res.status(301).send();
  next();
});

userSchema.methods.generateToken = async function () {
  const token = await jwt.sign(
    { _id: this._id.toString() },
    variables.tokenSecret
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userobject = user.toObject();
  delete userobject.password;
  delete userobject.tokens;
  return userobject;
};

userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("could not find user");
  }
  const isPasswordValide = await bcrypt.compare(password, user.password);
  if (!isPasswordValide) {
    throw new Error("Wrong password");
  }
  return user;
};

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
