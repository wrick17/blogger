const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { categories } = require('../../constants');

const categorySchema = new Schema({
  handle: { type: String, required: true, enum: Object.keys(categories) },
  title: { type: String, required: true },
})

const Category = mongoose.model('Category', categorySchema);

const postSchema = new Schema({
  handle: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true, enum: Object.keys(categories) },
})

const Post = mongoose.model('Post', postSchema);

module.exports = {
  Post,
  Category
};
