const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { categories } = require('../../constants');
const { Category, Post } = require('./schema');

function categoryRoutes(server, app) {

  server.get('/api/categories', function (req, res) {
    Category.find(function (err, result) {
      if (err) res.status(400).send(err);
      res.status(200).send(result);
    })
  })

  server.get('/api/category/:id', function(req, res) {
    const promises = [];
    promises.push(Category.find({ handle: req.params.id }));
    promises.push(Post.find({ category: req.params.id }));
    Promise.all(promises)
      .then(function(values) {
        const category = values[0][0];
        const postsInCategory = values[1];
        const { _id, handle, title } = category;
        res.send({
          _id,
          handle,
          title,
          posts: postsInCategory
        });
      })
      .catch(function(err) {
        res.status(400).send(err);
      })
  })

}

module.exports = categoryRoutes
