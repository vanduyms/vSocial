require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRouter");
const userRoute = require("./routes/userRouter");
const postRoute = require("./routes/postRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", postRoute);

app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;
  console.log("Connected to mongoDB!");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
})