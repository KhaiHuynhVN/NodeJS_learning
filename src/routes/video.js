const express = require('express');
const router = express.Router();

const VideoController = require('../app/controllers/VideoController');

router.get('/create', VideoController.create);
router.post('/store', VideoController.store);
router.post('/handle-form-action', VideoController.handleFormAction);
router.post('/handle-trash-video-action', VideoController.handleTrashVideoAction);
router.get('/:id/edit', VideoController.edit);
router.patch('/:id', VideoController.update);
router.patch('/restore/:id', VideoController.restore);
router.delete('/:ID', VideoController.delete);
router.delete('/destroy/:id', VideoController.permanentlyDestroy);
router.get('/:slug', VideoController.show);

module.exports = router;
