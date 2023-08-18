const Videos = require('../models/Videos');
const { mongooseToObjectForArray } = require('../../ulti/mongoose');

class MeController {
   // GET /me/stored/videos
   async myVideos(req, res, next) {
      try {
         let videos;

         if (req.query.hasOwnProperty('_storedVideoSort')) {
            req.query.type === 'default'
               ? (videos = await Videos.find({}))
               : (videos = await Videos.find({}).sort({ [req.query.column]: req.query.type }));
         } else {
            videos = await Videos.find({}).sort({ createdAt: 'asc' });
         }

         const deletedVideoCount = await Videos.countDocumentsWithDeleted({
            deleted: true,
            permanentlyDestroy: null,
         });

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

   // GET /me/stored/news
   async showNews(req, res, next) {
      res.render('render/new/showNews');
   }

   // GET /me/trash/videos
   async trashVideos(req, res, next) {
      try {
         let videos;

         if (req.query.hasOwnProperty('_trashSort')) {
            req.query.type === 'default'
               ? (videos = await Videos.findWithDeleted({
                    deleted: true,
                    permanentlyDestroy: null,
                 }))
               : (videos = await Videos.findWithDeleted({
                    deleted: true,
                    permanentlyDestroy: null,
                 }).sort({ [req.query.column]: req.query.type }));
         } else {
            videos = await Videos.findWithDeleted({
               deleted: true,
               permanentlyDestroy: null,
            }).sort({ deletedAt: 'asc' });
         }

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
