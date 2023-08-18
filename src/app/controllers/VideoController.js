const Videos = require('../models/Videos');
const { mongooseToObject } = require('../../ulti/mongoose');

class VideoController {
   // GET /videos/:slug
   async show(req, res, next) {
      try {
         const videos = await Videos.findOne({ slug: req.params.slug });

         if (!videos) {
            console.log('Chuyển đến trang 404');
         }

         res.render('render/video/show', {
            videos: mongooseToObject(videos),
         });
      } catch (error) {
         next(error);
      }
   }

   // GET /videos/create
   create(req, res, next) {
      res.render('render/video/create');
   }

   // GET /videos/:id/edit
   async edit(req, res, next) {
      try {
         const video = await Videos.findOne({ _id: req.params.id });
         res.render('render/video/edit', {
            video: mongooseToObject(video),
         });
      } catch (error) {
         next(error);
      }
   }

   // PATCH /videos/:id
   async update(req, res, next) {
      try {
         const formData = { ...req.body };
         formData.img = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`;
         await Videos.updateOne({ _id: req.params.id }, formData);
         res.redirect('/me/stored/videos');
      } catch (error) {
         next(error);
      }
   }

   // DELETE /videos/:ID
   async delete(req, res, next) {
      try {
         await Videos.delete({ _id: req.params.ID });
         res.redirect('back');
      } catch (error) {
         next(error);
      }
   }

   // DELETE /videos/destroy/:id
   async permanentlyDestroy(req, res, next) {
      try {
         await Videos.updateOneDeleted({ _id: req.params.id }, { permanentlyDestroy: true });
         res.redirect('back');
      } catch (error) {
         next(error);
      }
   }

   // PATCH /videos/restore/:id
   async restore(req, res, next) {
      try {
         // await Videos.restore({ _id: req.params.id }, { restoreAt: Date.now() });
         await Videos.updateOneDeleted(
            { _id: req.params.id },
            { $unset: { deletedAt: true }, deleted: false, restoreAt: Date.now() },
         );
         res.redirect('/me/trash/videos');
      } catch (error) {
         next(error);
      }
   }

   // POST /videos/store
   async store(req, res, next) {
      try {
         const formData = { ...req.body };
         formData.img = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`;
         const course = new Videos(formData);
         await course.save();
         res.redirect('/me/stored/videos');
      } catch (error) {
         next(error);
      }
   }

   // POST /videos/handle-form-action
   async handleFormAction(req, res, next) {
      switch (req.body.action) {
         case 'delete':
            try {
               await Videos.delete({ _id: { $in: req.body.checkboxVideoIds } });
               res.redirect('back');
            } catch (error) {
               next(error);
            }
            break;
         default:
            throw new Error(`Invalid action: ${req.body.action}`);
      }
   }

   // POST /videos/handle-trash-video-action
   async handleTrashVideoFormAction(req, res, next) {
      switch (req.body.action) {
         case 'permanentlyDestroy':
            try {
               await Videos.updateManyDeleted(
                  { _id: { $in: req.body.checkboxVideoIds } },
                  { permanentlyDestroy: true },
               );
               res.redirect('back');
            } catch (error) {
               next(error);
            }
            break;
         case 'restore':
            try {
               await Videos.updateManyDeleted(
                  { _id: { $in: req.body.checkboxVideoIds } },
                  { $unset: { deletedAt: true }, deleted: false, restoreAt: Date.now() },
               );
               res.redirect('/me/trash/videos');
            } catch (error) {
               next(error);
            }
            break;
         default:
            throw new Error(`Invalid action: ${req.body.action}`);
      }
   }
}

module.exports = new VideoController();
