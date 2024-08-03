const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../controllers/email");

const auth = {
  register: async (req, res) => {
    try {
      const { fullName, username, email, password, gender } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, '');

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name) return res.status(400).json({ msg: "This username already exists!" });

      const user_email = await Users.findOne({ username: email });
      if (user_email) return res.status(400).json({ msg: "This email already exists!" });

      if (password.toString().length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters!" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullName,
        username: newUserName,
        email,
        password: passwordHash,
        gender
      });

      await newUser.save();

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res
        .cookie('refreshToken', refresh_token, {
          httpOnly: true,
          path: '/api/refresh_token',
          maxAge: 30 * 24 * 60 * 60 * 1000
        })
        .json({
          msg: "Register success!",
          access_token,
          user: {
            ...newUser._doc,
            password: ''
          }
        });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate("followers following", "-password");
      if (!user) return res.status(400).json({ msg: "This email is not exist!" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "The password is incorrect!" });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res
        .cookie('refreshToken', refresh_token, {
          httpOnly: true,
          secure: true,
          path: '/api/refresh_token',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .json({
          msg: "Login success!",
          access_token,
          user: {
            ...user._doc,
            password: ''
          }
        });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/api/refresh_token' });
      return res.json({ msg: "Logout!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rft = req.cookies.refreshToken;
      if (!rft) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rft, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });
        const user = await Users.findById(result.id).select("-password").populate("followers following", "-password");
        if (!user) res.status(400).json({ msg: "This does not exist!" });

        const access_token = createAccessToken({ id: result.id });

        res.json({
          access_token,
          user
        });
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  sendResetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email: email });

      if (!user) return res.status(400).json({ msg: "This email doesn't exist" });

      const token = await Token.findOne({ userId: user._id });
      if (token) await Token.deleteOne();

      let resetToken = crypto.randomBytes(32).toString("hex");
      const hash = await bcrypt.hash(resetToken, 12);

      const newToken = new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      });

      await newToken.save();

      const link = `${process.env.BASE_URL}/resetPassword?id=${user._id}&resetToken=${newToken.token}`;
      await sendEmail(user.email, "Password reset", link);

      res.json({
        msg: "Link reset password sent successfully",
        token: newToken.token,
        id: user._id
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  resetPassword: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) return res.status(400).send("Invalid link or expired");

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });

      if (!token) return res.status(400).send("Invalid link or expired");

      const passwordHash = await bcrypt.hash(req.body.password, 12);

      user.password = passwordHash;
      await user.save();
      await token.delete();

      res.json({ msg: "Password reset sucessfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = auth;