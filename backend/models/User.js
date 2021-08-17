const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  resetPasswordLink: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userScheme);
