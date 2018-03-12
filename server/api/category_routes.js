const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { categories } = require('../../constants');
const { Category, Post } = require('./schema');

function categoryRoutes(server, app) {
  
  Category.find(function (err, result) {
    if (err) console.error(err);
    if (result.length < Object.keys(categories).length) {
      const promises = [];
      for (const key in categories) {
        if (categories.hasOwnProperty(key)) {
          const title = categories[key];
          const category = new Category({
            handle: key,
            title: title
          });
          promises.push(category.save());
        }
      }
      Promise.all(promises)
        .then(function(values) {
          Category.find(function (err, result) {
            console.log('loaded default values');
          })
        })
        .catch(function(error) {
          res.status(400).send(error);
        })
    }
  })
  
  server.get('/api/categories', (req, res) => {
    Category.find(function (err, result) {
      if (err) res.status(400).send(err);
      res.status(200).send(result);
    })
  })

  server.get('/api/category/:id', (req, res) => {
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