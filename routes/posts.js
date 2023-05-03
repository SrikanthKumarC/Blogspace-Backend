const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
// const Image = require("../models/image");


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


// post new comment route
router.post("/comment/:id/comment", getPost, async (req, res) => {
  try {
    const comment = new Comment({
      comment: req.body.comment,
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
    });
    const post = await Post.findById(req.params.id);
    // reference the post in the comment
    comment.page = post;
    await comment.save();
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//get single post
router.get("/singlePost/:id", getPost, (req, res) => {
  //try to get post and log error if there is one
  try {
    res.json(res.post);
  }catch (e) {
    res.status(500).json({ message: e.message });
  }
});
// get all comments for a single post
router.get('/comment/:id/comments', async (req, res) => {
  try {
    const comments = await Post.findById(req.params.id).populate('comments')
    res.json(comments.comments)
  }catch (e) {
    res.status(500).json({ message: e.message });
  }
})

// get category posts given category
router.get("/category/:category", async (req, res) => {
  try {
    const categoryPosts = await Post.find({ category: req.params.category });
    res.json(categoryPosts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//get one
// router.get("/:id", async (req, res) => {
//   try {
//     const posts = await Post.findById(req.params.id);
//     res.json(posts);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// SETTERS
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    contents: req.body.contents,
    email: req.body.email,
    name: req.body.name,
    category: req.body.category,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.patch("/singlePost/:id", getPost, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.contents != null) {
    res.post.contents = req.body.contents;
  }
  if (req.body.category != null) {
    res.post.category = req.body.category;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/delete/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "deleted post" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});




//delete comment
router.delete("comment/:id/comment/:commentId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await Comment.findById(req.params.commentId);
    await comment.remove();
    post.comments.pull(comment);
    await post.save();
    res.json({ message: "deleted comment" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


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


// // add images routes
// router.post("/image", async (req, res) => {
//   const image = new Image({
//     image: req.body.image,
//   });
// });

module.exports = router;
