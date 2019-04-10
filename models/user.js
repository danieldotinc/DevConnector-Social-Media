const mongoose = require("mongoose");
const Joi = require("joi");
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

const validateUser = user => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(50)
      .required(),
    avatar: Joi.string(),
    date: Joi.number().integer()
  };
  return Joi.validate(user, schema);
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.validate = validateUser;
