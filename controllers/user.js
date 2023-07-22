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
      const { avatar, fullName, mobile, address, story, website, gender } = req.body;
      await User.findByIdAndUpdate({ _id: req.user._id }, {
        avatar, fullName, mobile, address, story, website, gender
      });

      res.json({ msg: "Update success!" });
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
  }
}

module.exports = userController;