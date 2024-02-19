const User = require("../models/userModel");

const userController = {
  searchUser: async (req, res) => {
    try {
      const users = await User.find({ username: { $regex: req.query.username } }).limit(10).select("fullName username avatar");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password')
        .populate("followers following", "-password")
      if (!user) return res.status(400).json({ msg: "User does not exist." })

      res.json({ user });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { avatar, fullName, mobile, address, bio, website, gender } = req.body;
      const newUser = await User.findByIdAndUpdate({ _id: req.user._id }, {
        avatar, fullName, mobile, address, bio, website, gender
      });

      res.json({ msg: "Update success!", newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  follow: async (req, res) => {
    try {
      const user = await User.find({ _id: req.params.id, followers: req.user._id })
      if (user.length > 0) return res.status(500).json({ msg: "You followed this user." })

      const newUser = await User.findOneAndUpdate({ _id: req.params.id }, {
        $push: { followers: req.user._id }
      }, { new: true }).populate("followers following", "-password")

      await User.findOneAndUpdate({ _id: req.user._id }, {
        $push: { following: req.params.id }
      }, { new: true })

      res.json({ msg: "success", newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unFollow: async (req, res) => {
    try {
      const newUser = await User.findOneAndUpdate({ _id: req.params.id }, {
        $pull: { followers: req.user._id }
      }, { new: true }).populate("followers following", "-password")

      const user = await User.findOneAndUpdate({ _id: req.user._id }, {
        $pull: { following: req.params.id }
      }, { new: true })

      res.json({ msg: "success", user })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  suggestionUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id]

      const num = req.query.num || 10

      const users = await User.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
        { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
      ]).project("-password");

      return res.json({
        users,
        result: users.length
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = userController;