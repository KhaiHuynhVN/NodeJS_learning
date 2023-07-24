// mongod --dbpath F:/mongoDB-data/db
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const app = express();
const methodOverride = require('method-override');
const port = 3111;

const route = require('./routes');
const db = require('./config/db');

// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Method override
app.use(methodOverride('_method'));

// Template engine
app.engine(
   'hbs',
   handlebars.engine({
      extname: '.hbs',
      // Helper có thể cài vào trực tiếp trong controller luôn cũng được, còn cài ở đây thì là cài global.
      helpers: {
         formatDate(date) {
            const oldDate = new Date(date);
            const formattedDate = `${oldDate.getDate()}/${
               oldDate.getMonth() + 1
            }/${oldDate.getFullYear()} (${oldDate.getHours()}:${oldDate.getMinutes()}:${oldDate.getSeconds()})`;
            return formattedDate;
         },
      },
   }),
);

app.set('views', path.join(__dirname, 'resources', 'views'));

app.set('view engine', 'hbs');

// Route init
route(app);

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
