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
      const array = [];
      for (const category in categories) {
        if (categories.hasOwnProperty(category)) {
          const categoryName = categories[category];
          array.push({
            handle: category,
            title: categoryName,
            description: '',
            introduction: '',
            imageLink: '',
          })
        }
      }
      Category.create(array, function(error) {
        if (error) return console.log(error);
        console.log('added all')
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
        const { _id, handle, title, description, introduction, imageLink, draft } = category;
        res.send({
          _id,
          handle,
          title,
          description,
          introduction,
          imageLink,
          draft,
          posts: postsInCategory
        });
      })
      .catch(function (err) {
        res.status(400).send(err);
      })
  })

  router.put('/edit-category', function (req, res) {
    Category.update({ _id: req.body.id }, { $set: { draft: req.body.data } }, function (error) {
      const promises = [];
      Category.find({ _id: req.body.id })
        .then(function (result) {
          return result[0];
        })
        .then(function (result) {
          Post.find({ category: result.handle })
            .then(function (postsInCategory) {
              const category = result;
              const { _id, handle, title, description, introduction, imageLink, draft } = category;
              res.send({
                _id,
                handle,
                title,
                description,
                introduction,
                imageLink,
                draft,
                posts: postsInCategory
              });
            })
            .catch(function (err) {
              res.status(400).send(err);
            })
        })
    });
  })

  router.put('/publish-category', function (req, res) {
    Category.find({ _id: req.body.id }, function(error, categoriesList) {
      const category = categoriesList[0];
      const draft = category.draft;
      Category.update({ _id: req.body.id }, { $set: draft, $unset: { draft: 1 } }, function (error, result) {
        const promises = [];
        Category.find({ _id: req.body.id })
          .then(function (result) {
            return result[0];
          })
          .then(function (result) {
            Post.find({ category: result.handle })
              .then(function (postsInCategory) {
                const category = result;
                const { _id, handle, title, description, introduction, imageLink, draft } = category;
                res.send({
                  _id,
                  handle,
                  title,
                  description,
                  introduction,
                  imageLink,
                  draft,
                  posts: postsInCategory
                });
              })
              .catch(function (err) {
                res.status(400).send(err);
              })
          })
      });
    })
  })

  router.put('/reset-category', function (req, res) {
    Category.update({ _id: req.body.id }, { $unset: { draft: 1 } }, function (error, result) {
      const promises = [];
      Category.find({ _id: req.body.id })
        .then(function (result) {
          return result[0];
        })
        .then(function (result) {
          Post.find({ category: result.handle })
            .then(function (postsInCategory) {
              const category = result;
              const { _id, handle, title, description, introduction, imageLink, draft } = category;
              res.send({
                _id,
                handle,
                title,
                description,
                introduction,
                imageLink,
                draft,
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
