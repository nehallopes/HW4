const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
//Remove the key
const privateKey =  ``;

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
  });
  post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        id: savedPost._id,
        title: savedPost.title,
        content: savedPost.content,
        author: savedPost.author,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function(req, res) {
  const posts = await Post.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ posts });
});

router.delete("/:id", async function(req, res) {
  const { id } = req.params; 
  await Post.findByIdAndDelete(id) 
      .then(() => {
          return res.status(200).json({ message: "Todo deleted successfully" });
      })
      .catch((error) => {
          return res.status(500).json({ error: error.message });
      });
});

router.put("/:id", async function(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  await Post.findByIdAndUpdate(id, updateData, { new: true })
      .then((updatedTodo) => {
          return res.status(200).json(updatedTodo);
      })
      .catch((error) => {
          return res.status(500).json({ error: error.message });
      });
});

module.exports = router;