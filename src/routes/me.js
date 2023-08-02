const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/videos', meController.myVideos);
router.get('/stored/news', meController.showNews);
router.get('/trash/videos', meController.trashVideos);

module.exports = router;
