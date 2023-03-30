const router = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl');
const auth = require('../middlewares/auth');

router.post('/comment', auth, commentCtrl.createComment);

module.exports = router;