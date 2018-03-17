import { Route } from "react-router-dom";

import Layout from './components/layout'
import EditHome from './edit_home'
import EditPost from './edit_post'
import EditCategory from './edit_category';

const Edit = ({ match }) => (
  <Layout>
    <p>Edit page</p>
    <Route path={`${match.url}/edit`} component={EditHome} />
    <Route path={`${match.url}/:category/:post`} component={EditPost} />
    <Route path={`${match.url}/:category`} component={EditCategory} />
  </Layout>
)

export default Edit
