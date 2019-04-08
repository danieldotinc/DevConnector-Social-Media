const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String,
  date: {
    type: String,
    default: Date.now()
  }
});

userSchema.methods.generateAuthToken = function() {
  return Jwt.sign(
    { _id: this._id, name: this.name, avatar: this.avatar },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
