import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import NoSSR from 'react-no-ssr'

import Preview from './admin/preview'
import Edit from './admin/edit'
import Login from './admin/login'

import AuthButton from './admin/components/auth_button'
import PrivateRoute from './admin/components/private_route'
import Loading from './admin/components/loading'

class Admin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" />
        <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
        <NoSSR onSSR={<Loading />}>
          <Router basename='/admin'>
            <React.Fragment>
              <AuthButton />
              <PrivateRoute path='/preview' component={Preview} />
              <PrivateRoute path='/edit' component={Edit} />
              <Route path='/login' component={Login} />
            </React.Fragment>
          </Router>
        </NoSSR>
      </React.Fragment>
    );
  }
}

export default Admin
