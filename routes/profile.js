const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const {
  Profile,
  validate,
  validateExperience,
  validateEducation
} = require("../models/profile");

const { User } = require("../models/user");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate(
    "user",
    ["name", "avatar"]
  );
  if (!profile) return res.status(404).send("No profile found!");

  res.send(profile);
});

router.get("/all", async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  if (!profiles) return res.status(404).send("No profile found!");

  res.send(profiles);
});

router.get("/user/:id", async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.id }).populate(
    "user",
    "name"
  );
  if (!profile) return res.status(404).send("No profile found!");

  res.send(profile);
});

router.get("/handle/:handle", async (req, res) => {
  const profile = await Profile.findOne({ handle: req.params.handle }).populate(
    "user",
    ["name", "avatar"]
  );
  if (!profile) return res.status(404).send("No profile found!");

  res.send(profile);
});

router.post("/", auth, async (req, res) => {
  const request = { ...req.body, user: req.user._id };

  request.skills = request.skills.split(",");

  const { error } = validate(request);
  if (error) {
    const errorObj = {};
    error.details.map(e => (errorObj[e.path[0]] = e.message));
    return res.status(400).send(errorObj);
  }

  let profile = new Profile(request);
  await profile.save();

  res.send(profile);
});

router.put("/experience", auth, async (req, res) => {
  const request = { ...req.body };
  delete request._id;

  const { error } = validateExperience(request);
  if (error) {
    const errorObj = {};
    error.details.map(e => (errorObj[e.path[0]] = e.message));
    return res.status(400).send(errorObj);
  }
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).send("No profile found by this id!");

  const newExperience = { ...req.body };
  profile.experience.unshift(newExperience);

  await profile.save();
  res.send(profile);
});

router.put("/education", auth, async (req, res) => {
  const request = { ...req.body };
  delete request._id;

  const { error } = validateEducation(request);
  if (error) {
    const errorObj = {};
    error.details.map(e => (errorObj[e.path[0]] = e.message));
    return res.status(400).send(errorObj);
  }

  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).send("No profile found by this id!");

  const newEducation = { ...req.body };
  profile.education.unshift(newEducation);

  await profile.save();
  res.send(profile);
});

router.delete("/education/:id", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).send("No profile found with given id!");

  const item = profile.education.filter(i => i._id == req.params.id)[0];
  if (!item) return res.status(404).send("Education is already deleted!");
  profile.education.splice(profile.education.indexOf(item), 1);

  await profile.save();
  res.send(profile);
});

router.delete("/experience/:id", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).send("No profile found with given id!");

  const item = profile.experience.filter(i => i._id == req.params.id)[0];
  if (!item) return res.status(404).send("Experience is already deleted!");
  profile.experience.splice(profile.experience.indexOf(item), 1);

  await profile.save();
  res.send(profile);
});

router.delete("/", auth, async (req, res) => {
  await Profile.findOneAndRemove({ user: req.user._id });
  await User.findOneAndRemove({ _id: req.user._id });

  res.send("user and profile deleted successfully!");
});

router.put("/:id", auth, async (req, res) => {
  const request = { ...req.body, user: req.user._id };
  delete request._id;
  request.skills = request.skills.split(",");

  const { error } = validate(request);
  if (error) {
    const errorObj = {};
    error.details.map(e => (errorObj[e.path[0]] = e.message));
    return res.status(400).send(errorObj);
  }

  const profile = await Profile.findByIdAndUpdate(
    { _id: req.params.id },
    request,
    { new: true }
  );
  if (!profile) return res.status(404).send("No profile found by this id!");

  res.send(profile);
});

module.exports = router;
