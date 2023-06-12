const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars').engine;
const app = express();
const port = 3123;

app.use(express.static(path.join(__dirname, '/public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({ extname: '.hbs' }));

app.set('views', path.join(__dirname, '/resources/views'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
   res.render('home');
});

app.get('/news', (req, res) => {
   res.render('news');
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
