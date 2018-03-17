import { withRouter, Redirect, Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { authManager } from './utils';

function logout(history) {
  cookie.remove('token', { path: '/admin' });
  authManager.signout(() => {
    history.push('/login');
  })
}

const AuthButton = withRouter(({ history }) => {
  return (
    cookie.load('token') ? (
      history.location.pathname === '/login' ? <Redirect to="/" /> : <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={() => logout(history)}>Logout</button>
    ) : (
      history.location.pathname !== '/login' ? <Redirect to="/login" /> : <p />
    )
  )
})

export default AuthButton;
