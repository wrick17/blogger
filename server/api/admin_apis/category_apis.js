const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { categories } = require('../../../constants');
const { Post, Category } = require('../schema');
const authValidation = require('./auth_validation');

const router = express.Router();

function categoryApis(server, app) {

  router.use(authValidation);

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
        .then(function (values) {
          Category.find(function (err, result) {
            console.log('loaded default values');
          })
        })
        .catch(function (error) {
          res.status(400).send(error);
        })
    }
  })

  router.get('/categories', function (req, res) {
    Category.find(function (err, result) {
      if (err) res.status(400).send(err);
      res.status(200).send(result);
    })
  })

  router.get('/category/:id', function (req, res) {
    const promises = [];
    promises.push(Category.find({ handle: req.params.id }));
    promises.push(Post.find({ category: req.params.id }));
    Promise.all(promises)
      .then(function (values) {
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
      .catch(function (err) {
        res.status(400).send(err);
      })
  })

  router.put('/edit-category', function (req, res) {
    Category.update({ _id: req.body.id }, { $set: req.body.data }, function (error, result) {
      const promises = [];
      Category.find({ _id: req.body.id })
        .then(function (result) {
          return result[0];
        })
        .then(function (result) {
          Post.find({ category: result.handle })
            .then(function (postsInCategory) {
              const category = result;
              const { _id, handle, title } = category;
              res.send({
                _id,
                handle,
                title,
                posts: postsInCategory
              });
            })
            .catch(function (err) {
              res.status(400).send(err);
            })
        })
    });
  })

  server.use('/api/admin', router);

}

module.exports = categoryApis
