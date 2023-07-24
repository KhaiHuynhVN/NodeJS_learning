const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Videos = new Schema(
   {
      name: { type: String, require: true },
      decription: { type: String, require: true },
      img: { type: String, require: true },
      videoId: { type: String, require: true },
      slug: { type: String, slug: 'name', unique: true },
   },
   {
      timestamps: true,
   },
);

const videosModel = mongoose.model('Videos', Videos);

module.exports = videosModel;
