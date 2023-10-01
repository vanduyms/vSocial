const router = require("express").Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/post", auth, postCtrl.createPost);
router.get("/post", auth, postCtrl.getPosts);
router.get("/user_posts/:id", auth, postCtrl.getUserPost);

router.patch("/post/:id/like", auth, postCtrl.likePost);
router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);

router.patch("/post/:id", auth, postCtrl.updatePost);

router.get("/post/:id", auth, postCtrl.getPost);
router.delete("/post/:id", auth, postCtrl.deletePost);

router.get('/post_discover', auth, postCtrl.getPostsDicover);

module.exports = router;