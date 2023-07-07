const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars').engine;
const app = express();
const port = 3123;

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({ extname: '.hbs' }));

app.set('views', path.join(__dirname, '/resources/views'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
   res.render('render/home');
});

app.get('/news', (req, res) => {
   res.render('render/news');
});

app.get('/search', (req, res) => {
   res.render('render/search');
});

app.post('/search', (req, res) => {
   console.log(req.body);

   res.render('render/search');
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
