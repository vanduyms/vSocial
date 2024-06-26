const router = require("express").Router();
const notifyCtrl = require("../controllers/notify");
const auth = require("../middleware/auth");

router.get('/notifies', auth, notifyCtrl.getNotifies);

router.post('/notify', auth, notifyCtrl.createNotify)

router.delete('/notify/:id', auth, notifyCtrl.removeNotify)
router.put('/isReadNotify/:id', auth, notifyCtrl.isReadNotify)

router.delete('/deleteAllNotify', auth, notifyCtrl.deleteAllNotifies)



module.exports = router;