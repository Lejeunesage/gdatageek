const express = require('express');
const { getAllPosts, createPost } = require('../controllers/postsController');
const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);

module.exports = router;
