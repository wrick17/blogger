function adminRoutes(server, app) {

  server.get('/admin', (req, res) => {
    const actualPage = '/admin'
    app.render(req, res, actualPage, {})
  })

  server.get('/admin/*', (req, res) => {
    const actualPage = '/admin'
    app.render(req, res, actualPage, {})
  })
}

module.exports = adminRoutes
