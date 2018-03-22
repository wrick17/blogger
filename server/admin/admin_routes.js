const express = require('express');
const authValidation = require('./auth_validation');

const router = express.Router();

function adminRoutes(server, app) {

  router.use(authValidation);

  router.get('/login', (req, res) => {
    const actualPage = '/admin/login'
    const queryParams = { redirect: req.query.redirect };
    app.render(req, res, actualPage, queryParams)
  })

  router.get('/categories', (req, res) => {
    const actualPage = '/admin/categories'
    app.render(req, res, actualPage, {})
  })

  router.get('/posts', (req, res) => {
    const actualPage = '/admin/posts'
    app.render(req, res, actualPage, {})
  })

  router.get('/:category/:post', (req, res) => {
    const actualPage = '/admin/edit_post'
    const queryParams = { id: req.params.post, category: req.params.category }
    app.render(req, res, actualPage, queryParams)
  })

  router.get('/:category', (req, res) => {
    if (req.url === '/login' || req.url === '/posts' || req.url === '/categories') return;
    const actualPage = '/admin/edit_category'
    const queryParams = { id: req.params.category }
    app.render(req, res, actualPage, queryParams)
  })

  router.get('/', (req, res) => {
    const actualPage = '/admin/edit_home'
    app.render(req, res, actualPage, {})
  })

  server.use('/admin', router);
  
}

module.exports = adminRoutes
