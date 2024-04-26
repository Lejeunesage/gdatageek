const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
