const router = require("express").Router();
const auth = require("../controllers/auth");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/resetPassword", auth.sendResetPassword);
router.post("/resetPassword/:id/:token", auth.resetPassword);
router.post("/refresh_token", auth.generateAccessToken);

module.exports = router;