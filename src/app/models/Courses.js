const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Course = new Schema({
   name: { type: String, minLength: 1 },
   decription: { type: String, minLength: 1 },
   img: { type: String },
   createAt: { type: Date, default: Date.now() },
   updatedAt: { type: Date, default: Date.now() },
});

const courseModel = mongoose.model("Course", Course);

module.exports = courseModel;
