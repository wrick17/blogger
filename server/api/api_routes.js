const postRoutes = require('./post_routes');
const categoryRoutes = require('./category_routes');

function apiRoutes(server, app) {

  postRoutes(server, app);

  categoryRoutes(server, app);

  // homePageRoutes

}

module.exports = apiRoutes
