const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { categories } = require('../../constants');
const { Post } = require('./schema');

function postRoutes(server, app) {
  
  server.get('/api/posts', (req, res) => {
    Post.find(function (err, posts) {
      if (err) res.status(400).send(err);
      res.status(200).send(posts);
    })
  })

  server.get('/api/post/:id', (req, res) => {
    Post.find({ handle: req.params.id }, function (err, posts) {
      if (err) res.status(400).send(err);
      res.status(200).send(posts[0]);
    })
  })

  server.post('/api/create-post', (req, res) => {
    const post = new Post(req.body);
    post.save(function(err, post) {
      if (err) res.status(400).send(err);
      Post.find(function (err, posts) {
        if (err) res.status(400).send(err);
        res.status(201).send(posts);
      })
    })
  })

  server.put('/api/edit-post', (req, res) => {
    Post.update({ _id: req.body.id }, { $set: req.body.data }, function(error, result) {
      Post.find({ _id: req.body.id }, function (err, posts) {
        if (err) res.status(400).send(err);
        res.status(202).send(posts[0]);
      })
    })
  })

  server.delete('/api/delete-post', (req, res) => {
    Post.remove({ _id: req.body.id }, function(error) {
      if (error) res.status(400).send(error);
      
      Post.find(function (err, posts) {
        if (err) res.status(400).send(err);
        res.status(202).send(posts);
      })
    });
  })

}

module.exports = postRoutes;
