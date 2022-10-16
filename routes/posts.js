const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({_id:-1});
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
//get one
router.get("/:id", getPost, (req, res) => {
  res.send(res.post.title);
});

// SETTERS
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    contents: req.body.contents,
    email: req.body.email,
    name: req.body.name,
    category: req.body.category
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.patch('/:id', getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title
    }
    if (req.body.contents != null) {
        res.post.contents = req.body.contents
    }
    if (req.body.category != null) {
        res.post.category = req.body.category
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    }catch (e) {
        res.status(400).json({message: e.message})
    }
})

router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({message: 'deleted post'})
    }catch (e) {
        res.status(500).json({message: e.message})
    }
})

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post === null) {
      return res.status(404).json({ message: "cannot find post" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
  res.post = post;
  next();
}
module.exports = router;
