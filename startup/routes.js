const express = require("express");
const auth = require("../routes/auth");
const home = require("../routes/home");
const users = require("../routes/users");

module.exports = app => {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/", home);
};
