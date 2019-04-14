const express = require("express");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const check = await User.findOne({ email: req.body.email });
  if (check)
    return res.status(400).send({ email: "This email is already taken!" });

  const avatar = gravatar.url(req.body.email, {
    s: "200", //size
    r: "pg", //Rating
    d: "mm" //Default
  });

  if (req.body.password != req.body.password2)
    return res.status(400).send({
      password: "Passwords don't match!",
      password2: "Passwords don't match!"
    });

  const { error } = validate(_.pick(req.body, ["name", "email", "password"]));
  if (error)
    return res
      .status(400)
      .send({ [error.details[0].path[0]]: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    avatar
  });

  const token = user.generateAuthToken();

  await user.save();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["name", "email", "avatar"]));
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send("The user with given id not found!");
  res.send(user);
});

module.exports = router;
