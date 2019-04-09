const express = require("express");
const auth = require("../middleware/auth");
const { Profile, validate } = require("../models/profile");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).send("No profile found!");

  res.send(profile);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let profile = new Profile(req.body);
  await profile.save();

  res.send(profile);
});

module.exports = router;
