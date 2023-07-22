const Post = require('../models/postModel');

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, image } = req.body;

      const newPost = new Post({ content, image, user: req.user._id });
      await newPost.save();

      res.json({ newPost })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user._id });
      // await Comments.deleteMany({ _id: { $in: post.comments } })

      res.json({
        msg: "Deleted post"
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("user likes", "avatar username fullname followers").populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password"
        }
      });

      if (!post) return res.status(400).json({ msg: "This post is not exist!" });

      res.json({ post });

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = postController;