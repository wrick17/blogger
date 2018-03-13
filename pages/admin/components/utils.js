import cookie from 'react-cookies';

export const authManager = {
  authenticate: (creds, cb = ()=>{}) => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(creds)
    })
      .then(res => res.json())
      .then(user => {
        cookie.save('token', user.token);
        cb();
      })
  },
  signout: (cb = ()=>{}) => {
    adminFetch('/api/logout', {
      method: 'POST'
    })
      .then(() => {
        cookie.remove('token');
        cb();
      })
  }
}

export const adminFetch = (url, config = {}) => {
  console.log(cookie.load('token'));
  const fetchConfig = Object.assign({}, config, {
    headers: {
      token: cookie.load('token')
    }
  });
  return fetch(url, fetchConfig);
}
