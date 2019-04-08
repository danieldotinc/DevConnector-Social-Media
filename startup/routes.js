const express = require("express");
const home = require("../routes/home");
const users = require("../routes/users");

module.exports = app => {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/", home);
};
