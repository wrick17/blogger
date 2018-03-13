import { Route, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { authManager } from './utils';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookie.load('token')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

export default PrivateRoute
