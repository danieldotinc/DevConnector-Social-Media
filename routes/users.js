const express = require("express");
const { User } = require("../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const check = await User.findOne({ email: req.body.email });
  if (check) return res.status(400).send("This email is already taken!");
  const avatar = gravatar.url(req.body.email, {
    s: "200", //size
    r: "pg", //Rating
    d: "mm" //Default
  });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    avatar
  });

  await user.save();
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send("The user with given id not found!");
  res.send(user);
});

module.exports = router;
