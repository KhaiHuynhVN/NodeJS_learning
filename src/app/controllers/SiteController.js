const Videos = require('../models/Videos');
const { mongooseToObjectForArray } = require('../../ulti/mongoose');

class SiteController {
   // GET /
   async home(req, res, next) {
      try {
         const videos = await Videos.find({});
         // console.log(JSON.parse(JSON.stringify(courses)));

         res.render('render/home', {
            // courses: JSON.parse(JSON.stringify(courses)),
            // courses: mongooseToObject(courses),
            videos: mongooseToObjectForArray(videos),
         });
      } catch (error) {
         next(error);
      }
   }

   // GET /search
   search(req, res) {
      // console.log(req.query);
      res.render('render/search');
   }
}

module.exports = new SiteController();
