const express = require("express");
const auth = require("../middleware/auth");
const { Post, validate, validateComment } = require("../models/post");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  if (!posts.length) return res.send("There are no posts yet!");
  res.send(posts);
});

router.get("/:id", auth, async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) return res.send("This post is deleted!");

  res.send(post);
});

router.post("/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("This post is deleted!");

  const user = req.user._id;
  if (post.likes.some(e => e.user == user))
    post.likes = post.likes.filter(like => like.user != user);
  else post.likes.push({ user });

  await post.save();
  res.send(post);
});

router.post("/comment/:id", auth, async (req, res) => {
  const user = req.user._id;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("This post is deleted!");

  const comment = { ...req.body, user };
  const { error } = validateComment(comment);
  if (error) return res.status(400).send(error.details[0].message);

  post.comments.push(comment);

  await post.save();
  res.send(post);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const postObj = { ...req.body, name: req.user.name, avatar: req.user.avatar };

  const post = new Post(postObj);
  await post.save();

  res.send(post);
});

router.delete("/comment/:id/:cid", auth, async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });
  if (!post) return res.status(404).send("The post is already deleted!");

  const user = req.user._id;
  if (!post.comments.some(e => e._id == req.params.cid))
    return res.status(404).send("The comment is already deleted!");

  if (post.comments.some(e => e.user == user && e._id == req.params.cid))
    post.comments = post.comments.filter(c => c._id != req.params.cid);
  else return res.status(401).send("You can't delete other's comments!");

  await post.save();
  res.send(post);
});

router.delete("/:id", auth, async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });
  if (!post) return res.status(404).send("The post is already deleted!");

  if (post.user != req.user._id)
    return res.status(401).send("You can only delete posts that you created!");

  await post.remove();
  res.send(post);
});

module.exports = router;
