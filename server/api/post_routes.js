const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { categories } = require('../../constants');
const { Post } = require('./schema');

function postRoutes(server, app) {

  server.get('/api/post/:id', (req, res) => {
    Post.find({ handle: req.params.id }, function (err, posts) {
      if (err) res.status(400).send(err);
      res.status(200).send(posts[0]);
    })
  })

}

module.exports = postRoutes;
