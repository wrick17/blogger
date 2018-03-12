function appRoutes(server, app) {

  server.get('/:category/:post', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.post, category: req.params.category }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:category', (req, res) => {
    const actualPage = '/category'
    const queryParams = { id: req.params.category }
    app.render(req, res, actualPage, queryParams)
  })

}

module.exports = appRoutes
