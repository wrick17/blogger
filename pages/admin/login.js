import Router from 'next/router'
import { authManager } from './components/utils'
import AdminStyles from './components/admin_styles';
import NoSSR from 'react-no-ssr'

import { Card } from 'rmwc/Card';
import { TextField } from 'rmwc/TextField';
import { FormField } from 'rmwc/FormField';
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button'

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
    }, () => Router.push(this.props.url.query.redirect || '/admin'))
  }

  render() {
    return (
      <NoSSR>
        <AdminStyles>
          <div className="login-page">
            <Card>
              <form action="#" className="login-form" onSubmit={this.login} >
                <Typography use="headline" style={{ display: 'block', marginBottom: '30px' }}>Login</Typography>
                <FormField>
                  <TextField label="Title" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                </FormField>
                <FormField>
                  <TextField label="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} type="password" />
                </FormField>
                <Button raised style={{ marginTop: '20px' }} >Login</Button>
              </form>
            </Card>
          </div>
        </AdminStyles>
        <style jsx>{`
          .login-form {
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
          }
          .login-page {
            padding-top: 20vh;
            display: flex;
            flex-direction: column;
            width: 300px;
            margin: auto;
          }
        `}</style>
        <style jsx global>{`
          .login-form .mdc-form-field, .login-form .mdc-text-field {
            width: 100%;
          }
        `}</style>
      </NoSSR>
    )
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
