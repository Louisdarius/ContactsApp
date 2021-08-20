const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateToken();
    res.json({ user, token });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    !user && res.json({ message: "Wrong credentials" });
    const token = await user.generateToken();
    res.json({ user, token });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { user, token: receivedToken } = req;
    user.tokens = user.tokens.filter((token) => {
      return token.token !== receivedToken;
    });
    await user.save();
    res.json({
      status: "Success",
      message: "You have been successfully logged out",
    });
  } catch (e) {
    next(e);
  }
};

const logoutAll = async (req, res, next) => {
  try {
    const { user, token: receivedToken } = req;
    user.tokens = [];
    await user.save();
    res.json({
      status: "Success",
      message: "You have been successfully logged out of all devices.",
    });
  } catch (e) {
    res.send(e);
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  const user = req.user;
  let {
    name: { first, last },
    email,
    password,
  } = req.body;

  first == "" && (first = user.name.first);
  last == "" && (last = user.name.last);
  email == "" && (email = user.email);
  password == "" && (password = user.password);

  user.name.first = first;
  user.name.last = last;
  user.email = email;
  user.password = password;

  try {
    await user.save();
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await req.user.remove();
    res.json({ status: "success", message: "User has been removed" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  register,
  login,
  logout,
  logoutAll,
  updateUser,
  deleteUser,
};
