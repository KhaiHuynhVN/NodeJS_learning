class SiteController {
   // GET /
   home(req, res) {
      res.render('render/home');
   }

   // GET /search
   search(req, res) {
      console.log(req.query);
      res.render('render/search');
   }
}

module.exports = new SiteController();
