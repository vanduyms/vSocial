require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const { ExpressPeerServer } = require("peer");
const cookieParser = require("cookie-parser");
const SocketServer = require("./socketServer");

const authRoute = require("./routes/authRouter");
const userRoute = require("./routes/userRouter");
const postRoute = require("./routes/postRouter");
const commentRoute = require("./routes/commentRouter");
const messageRoute = require("./routes/messageRouter");
const notifyRouter = require("./routes/notifyRouter");

const app = express();
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true,
  "sameSite": "none"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http, { cors: ["https://vsocial.onrender.com", "https://vsocial-backend.up.railway.app", "https://vsocial-backend.up.railway.app/"] });

ExpressPeerServer(http, { path: '/' });

io.on('connection', (socket) => {
  console.log("Socket is connected to server");
  SocketServer(socket);
})


app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", commentRoute);
app.use("/api", messageRoute);
app.use("/api", notifyRouter);

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
http.listen(port, () => {
  console.log("Server is running on port", port);
})
