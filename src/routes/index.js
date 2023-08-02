const videoRoute = require('./video');
const siteRoute = require('./site');
const meRoute = require('./me');

function route(app) {
   app.use('/videos', videoRoute);
   app.use('/me', meRoute);
   app.use('/', siteRoute);
}

module.exports = route;
