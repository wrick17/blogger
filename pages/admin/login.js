import Router from 'next/router'
import { authManager } from './components/utils'
import AdminStyles from '../admin/components/admin_styles';

class Login extends React.Component {
  state = {
    username: 'admin',
    password: 'password'
  }

  login = e => {
    e.preventDefault();
    console.log('i am here')
    const { username, password } = this.state;
    authManager.authenticate({
      username,
      password
    }, () => Router.push(this.props.url.query.redirect || '/admin/edit'))
  }

  render() {
    return (
      <div className="login-page">
        <AdminStyles />
        <form action="#" onSubmit={this.login} className="demo-card-wide mdl-card mdl-shadow--2dp login-form" >
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Login</h2>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="username" value={this.state.username} onChange={e => this.setState({ username: e.target.value }) } />
            <label className="mdl-textfield__label" htmlFor="username">Username</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="password" id="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value }) } />
            <label className="mdl-textfield__label" htmlFor="password">Password</label>
          </div>
          <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Login</button>
        </form>

        <style jsx>{`
          .login-form {
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
          }
          .login-page {
            padding-top: 20vh;
          }
        `}</style>
      </div>
    )
  }
}

export default Login
