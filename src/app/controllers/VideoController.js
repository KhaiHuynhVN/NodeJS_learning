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
         const formData = req.body;
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
         await Videos.deleteOne({ _id: req.params.ID });
         res.redirect('/me/stored/videos');
      } catch (error) {
         next(error);
      }
   }

   // POST /videos/store
   async store(req, res, next) {
      try {
         const formData = req.body;
         formData.img = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`;
         const course = new Videos(formData);
         await course.save();
         res.redirect('/me/stored/videos');
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new VideoController();
