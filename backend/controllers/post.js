const Post = require('../models/postModel');

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const newPost = new Post({ content, images, user: req.user });
      await newPost.save();

      res.json({
        newPost: {
          ...newPost._doc,
          user: req.user
        }
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const perPage = parseInt(req.query.limit || 20);
      const page = parseInt(req.query.page || 1);

      const query = Post.find({
        user: { $in: [...req.user.following, req.user._id] }
      })
      const posts = await query.sort({ _id: -1 }).skip((perPage * page) - perPage).limit(perPage).populate("user likes", "avatar username fullName followers").populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password"
        }
      });


      res.json({
        msg: 'Success!',
        result: posts.length,
        posts
      })

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, image } = req.body;
      const post = await Post.findOneAndUpdate({ _id: req.params.id }, { content, image }).populate("user likes", "avatar username fullName followers").populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password"
        }
      })

      res.json({
        msg: "Success",
        newPost: {
          ...post._doc,
          content,
          image
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.find({ _id: req.params.id, likes: req.user._id });
      if (post.length > 0) return res.status(500).json({ msg: "You liked this post" });

      const like = await Post.findOneAndUpdate({ _id: req.params.id }, { $push: { likes: req.user._id } }, { new: true }).populate("user");
      if (!like) return res.status(400).json({ msg: "This post is not exist" });

      res.json({ msg: "Liked post !", result: like })

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unLikePost: async (req, res) => {
    try {
      const like = await Post.findOneAndUpdate({ _id: req.params.id }, { $pull: { likes: req.user._id } }, { new: true }).populate("user");

      if (!like) return res.status(400).json({ msg: "This post is not exist" });

      res.json({ msg: "UnLiked post !", result: like })

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserPost: async (req, res) => {
    try {
      const perPage = parseInt(req.query.limit || 12);
      const page = parseInt(req.query.page || 1);

      const query = Post.find({ user: req.params.id });

      const posts = await query.sort("-createdAt").skip((perPage * page) - perPage).limit(perPage).populate("user likes", "avatar username fullName followers");

      // const posts = await Post.find({ user: req.params.id }).populate("user likes", "avatar username fullName followers").sort("-createdAt");

      res.json({
        posts,
        result: posts.length
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("user likes", "avatar username fullName followers").populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password"
        }
      });

      // if (!post) return res.status(400).json({ msg: "This post is not exist!" });

      res.json({ post });

    } catch (err) {
      return res.status(500).json({ msg: err.message })
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
  getPostsDicover: async (req, res) => {
    try {

      const newArr = [...req.user.following, req.user._id]

      const num = req.query.num || 9

      const posts = await Post.aggregate([
        { $match: { user: { $in: newArr } } },
        { $sample: { size: Number(num) } },
      ])

      return res.json({
        msg: 'Success!',
        result: posts.length,
        posts
      })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = postController;