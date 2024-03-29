const router = require("express").Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.get("/search", auth, userCtrl.searchUser);
router.get("/user/:id", auth, userCtrl.getUser);
router.get('/suggestionsUser', auth, userCtrl.suggestionUser)

router.patch("/user", auth, userCtrl.updateUser);
router.patch("/user/:id/follow", auth, userCtrl.follow);
router.patch("/user/:id/unfollow", auth, userCtrl.unFollow);

module.exports = router;