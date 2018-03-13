const postRoutes = require('./post_routes');
const categoryRoutes = require('./category_routes');
const authRoutes = require('./auth_routes');
const postApis = require('./admin_apis/post_apis');
const categoryApis = require('./admin_apis/category_apis');

function apiRoutes(server, app) {

  postRoutes(server, app);

  categoryRoutes(server, app);

  authRoutes(server, app);

  postApis(server, app);

  categoryApis(server, app);

}

module.exports = apiRoutes
