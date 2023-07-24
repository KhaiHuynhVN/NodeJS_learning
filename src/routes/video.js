const express = require('express');
const router = express.Router();

const VideoController = require('../app/controllers/VideoController');

router.get('/create', VideoController.create);
router.post('/store', VideoController.store);
router.get('/:id/edit', VideoController.edit);
router.patch('/:id', VideoController.update);
router.delete('/:ID', VideoController.delete);
router.get('/:slug', VideoController.show);

module.exports = router;
