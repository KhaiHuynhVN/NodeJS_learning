// mongod --dbpath F:/mongoDB-data/db
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars").engine;
const app = express();
const port = 3111;

const route = require("./routes");
const db = require("./config/db");

// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine("hbs", handlebars({ extname: ".hbs" }));

app.set("views", path.join(__dirname, "resources", "views"));

app.set("view engine", "hbs");

// Route init
route(app);

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
