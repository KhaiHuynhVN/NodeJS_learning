// mongod --dbpath F:/mongoDB-data/db
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const app = express();
const methodOverride = require('method-override');
const port = 3112;

const route = require('./routes');
const db = require('./config/db');
const SortMiddleWare = require('./app/middlewares/SortMiddleWare');

// Connect DB
db.connect();

// Define req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Method override
app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleWare);

// Set up public for handlebars engine
app.use(express.static(path.join(__dirname, 'public')));

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
         sortIcons(field, sort) {
            let sortType = field === sort.column ? sort.type : 'default';

            const icons = {
               default: `
                        <i style="display: block; color: blue; font-size: 20px" 
                           class="fa-duotone fa-circle-sort"></i>
                        `,
               asc: `
                     <i style="display: block; color: blue; font-size: 20px" 
                        class="fa-regular fa-arrow-down-short-wide"></i>
                     `,
               desc: `
                     <i style="display: block; color: blue; font-size: 20px" 
                        class="fa-regular fa-arrow-up-short-wide"></i>
                     `,
            };

            const types = {
               default: 'asc',
               asc: 'desc',
               desc: 'default',
            };

            return `
                     <a class="ms-2" style="display: inline-block; width: 20px; height: 20px" 
                        href="?${sort.key}&column=${field}&type=${types[sortType]}"
                     >
                        ${icons[sortType]}
                     </a>
                  `;
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
