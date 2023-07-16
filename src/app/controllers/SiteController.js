const Course = require("../models/Courses");
const { mongooseToObjectForArray } = require("../../ulti/mongoose");
class SiteController {
   // GET /
   async home(req, res) {
      try {
         const courses = await Course.find({});
         // console.log(JSON.parse(JSON.stringify(courses)));

         res.render("render/home", {
            // courses: JSON.parse(JSON.stringify(courses)),
            // courses: mongooseToObject(courses),
            courses: mongooseToObjectForArray(courses),
         });
      } catch (error) {
         console.log(error);
      }
   }

   // GET /search
   search(req, res) {
      // console.log(req.query);
      res.render("render/search");
   }
}

module.exports = new SiteController();
