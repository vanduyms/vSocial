const router = require("express").Router();
const postCtrl = require("../controllers/post");

router.route("/post").post(auth, postCtrl.createPost).get(auth, postCtrl.getPosts);
router.route("/post/:id").patch(auth, postCtrl.updatePost).get(auth, postCtrl.getPost).delete(auth, postCtrl.deletePost);

