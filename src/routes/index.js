const newsRoute = require('./news');
const siteRoute = require('./site');

function route(app) {
   app.use('/news', newsRoute);

   app.use('/', siteRoute);

   app.post('/search', (req, res) => {
      res.render('render/search');
   });
}

module.exports = route;
