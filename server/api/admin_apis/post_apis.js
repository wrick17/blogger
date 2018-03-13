const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { categories } = require('../../../constants');
const { Post } = require('../schema');
const authValidation = require('./auth_validation');

const router = express.Router();

function postApis(server, app) {

  router.use(authValidation);

  router.get('/posts', (req, res) => {
    Post.find(function (err, posts) {
      if (err) res.status(400).send(err);
      res.status(200).send(posts);
    })
  })

  router.get('/post/:id', (req, res) => {
    Post.find({ handle: req.params.id }, function (err, posts) {
      if (err) res.status(400).send(err);
      res.status(200).send(posts[0]);
    })
  })

  router.post('/create-post', (req, res) => {
    const post = new Post(req.body);
    post.save(function (err, post) {
      if (err) res.status(400).send(err);
      Post.find(function (err, posts) {
        if (err) res.status(400).send(err);
        res.status(201).send(posts);
      })
    })
  })

  router.put('/edit-post', (req, res) => {
    Post.update({ _id: req.body.id }, { $set: req.body.data }, function (error) {
      Post.find({ _id: req.body.id }, function (err, posts) {
        if (err) res.status(400).send(err);
        res.status(202).send(posts[0]);
      })
    })
  })

  router.delete('/delete-post', (req, res) => {
    Post.remove({ _id: req.body.id }, function (error) {
      if (error) res.status(400).send(error);

      Post.find(function (err, posts) {
        if (err) res.status(400).send(err);
        res.status(202).send(posts);
      })
    });
  })

  server.use('/api/admin', router);
}

module.exports = postApis;
