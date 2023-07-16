class NewsController {
   // GET /news
   index(req, res) {
      res.render("render/news");
   }

   // GET /news/:posts
   post(req, res) {
      res.send("DemonVN");
   }
}

module.exports = new NewsController();
