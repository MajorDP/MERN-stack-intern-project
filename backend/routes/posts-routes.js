const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join("./data/", "posts.json");

const readPosts = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writePosts = (posts) => {
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
};

router.get("/api/get/post/:id", (req, res) => {
  const posts = readPosts();
  const post = posts.find((p) => p.postId === req.params.id);
  res.json(post || { message: "Post not found" });
});

router.get("/api/posts", (req, res) => {
  res.json(readPosts());
});

router.put("/api/edit", (req, res) => {
  let posts = readPosts();
  const { postId, title, message, userId, postedBy, userImg, datePosted } =
    req.body;

  const postIndex = posts.findIndex((post) => post.postId === postId);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found." });
  }

  posts[postIndex] = {
    postId,
    userId,
    title,
    message,
    postedBy,
    userImg,
    datePosted,
    isEdited: true,
  };
  writePosts(posts);

  res.status(200).json({ success: true });
});

router.post("/api/post", (req, res) => {
  let posts = readPosts();
  const { title, message, userId, postedBy, userImg } = req.body;

  if (!title || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields." });
  }

  const newPost = {
    postId: `${Math.random()}`,
    userId,
    title,
    message,
    postedBy,
    userImg,
    datePosted: new Date().toLocaleDateString(),
  };

  posts.unshift(newPost);
  writePosts(posts);

  res.status(201).json({ success: true, post: newPost });
});

router.get("/api/posts/:uid", (req, res) => {
  const posts = readPosts();
  const userPosts = posts.filter((post) => post.userId === req.params.uid);
  res.json(userPosts);
});

router.get("/api/posts/delete/:postId", (req, res) => {
  let posts = readPosts();
  const postIndex = posts.findIndex(
    (post) => post.postId === req.params.postId
  );

  console.log(posts[postIndex]);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found." });
  }

  posts.splice(postIndex, 1);
  writePosts(posts);

  res.json({ success: true });
});

module.exports = router;
