const router = require("express").Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/post", auth, postCtrl.createPost);
router.get("/post", auth, postCtrl.getPosts);

router.patch("/post/:id/like", auth, postCtrl.likePost);
router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);

router.patch("/post/:id", postCtrl.updatePost);

router.get("/post/:id", postCtrl.getPost);
router.delete("/post/:id", postCtrl.deletePost);


module.exports = router;