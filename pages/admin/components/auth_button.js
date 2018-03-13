import { withRouter, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { authManager } from './utils';

function logout(history) {
  authManager.signout(() => {
    history.push('/login');
  })
}

const AuthButton = withRouter(({ history }) => (
  cookie.load('token') ? (
    history.location.pathname === '/login' ? <Redirect to="/preview" /> : <p>You are logged in <button onClick={() => logout(history)}>Logout</button></p>
  ) : (
    history.location.pathname !== '/login' ? <Redirect to="/login" /> : <p>You are logged out</p>
  )
))

export default AuthButton;
