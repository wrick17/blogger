const adminRoutes = require('./admin/admin_routes')
const apiRoutes = require('./api/api_routes')
const appRoutes = require('./app/app_routes')

function routes (server, app) {
  
  const handle = app.getRequestHandler()  

  adminRoutes(server, app)

  apiRoutes(server, app)

  appRoutes(server, app)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

}

module.exports = routes
