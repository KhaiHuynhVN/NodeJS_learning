const Videos = require('../models/Videos');
const { mongooseToObjectForArray } = require('../../ulti/mongoose');

class MeController {
   // GET /stored/videos
   async myVideos(req, res, next) {
      try {
         const videos = await Videos.find({});

         if (!videos) {
            console.log('Chuyển đến trang 404');
         }

         res.render('render/video/myVideos', {
            videos: mongooseToObjectForArray(videos),
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
   async showNews(req, res, next) {
      res.render('render/new/showNews');
   }
}

module.exports = new MeController();
