const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).send("Invalid username or password!");

  const checkPass = await bcrypt.compare(req.body.password, user.password);
  if (!checkPass) return res.status(400).send("Invalid username or password!");

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
