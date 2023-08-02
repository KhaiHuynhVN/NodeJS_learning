const Videos = require('../models/Videos');
const { mongooseToObjectForArray } = require('../../ulti/mongoose');

class MeController {
   // GET me/stored/videos
   async myVideos(req, res, next) {
      try {
         const videos = await Videos.find({});
         const deletedVideoCount = await Videos.countDocumentsWithDeleted({
            deleted: true,
            permanentlyDestroy: null,
         });
         // const count = mongooseToObjectForArray(videos).length;
         const count = await Videos.countDocuments({});

         res.render('render/video/myVideos', {
            videos: mongooseToObjectForArray(videos),
            count,
            deletedVideoCount,
            helpers: {
               increment(index) {
                  return Number(index) + 1;
               },
            },
         });
      } catch (error) {
         next(error);
      }
   }

   // GET me/stored/news
   async showNews(req, res, next) {
      res.render('render/new/showNews');
   }

   // GET me/trash/videos
   async trashVideos(req, res, next) {
      try {
         const videos = await Videos.findWithDeleted({ deleted: true, permanentlyDestroy: null });
         const count = await Videos.countDocumentsWithDeleted({
            deleted: true,
            permanentlyDestroy: null,
         });

         res.render('render/video/trashVideos', {
            videos: mongooseToObjectForArray(videos),
            count,
            helpers: {
               increment(index) {
                  return Number(index) + 1;
               },
            },
         });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new MeController();
