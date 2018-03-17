import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import NoSSR from 'react-no-ssr'

import Edit from './admin/edit'
import Login from './admin/login'

import PrivateRoute from './admin/components/private_route'
import Loading from './admin/components/loading'

import EditHome from './admin/edit_home'
import EditPost from './admin/edit_post'
import EditCategory from "./admin/edit_category";

class Admin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/getmdl-select@2.0.1/getmdl-select.min.css" />
        <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/getmdl-select@2.0.1/getmdl-select.min.js"></script>
        <NoSSR onSSR={<Loading />}>
          <Router basename="/admin">
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/' component={EditHome} />
              <PrivateRoute path='/:category/:post' component={EditPost} />
              <PrivateRoute path='/:category' component={EditCategory} />
              <Redirect to="/admin" />
            </Switch>
          </Router>
        </NoSSR>
      </React.Fragment>
    );
  }
}

export default Admin
