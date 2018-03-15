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
  description: { type: String },
  imageLink: { type: String },
  draft: {
    handle: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true, enum: Object.keys(categories) },
    description: { type: String },
    imageLink: { type: String },
  }
})

const Post = mongoose.model('Post', postSchema);

const authSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String, unique: true }
})

const Auth = mongoose.model('Auth', authSchema);

module.exports = {
  Post,
  Category,
  Auth
};
