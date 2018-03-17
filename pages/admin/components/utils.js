import { history } from 'react-router-dom';
import cookie from 'react-cookies';

export const authManager = {
  authenticate: (creds, cb = ()=>{}) => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(creds)
    })
      .then(res => res.json())
      .then(user => {
        cookie.save('token', user.token, { path: '/admin' });
        cb();
      })
  },
  signout: (cb = ()=>{}) => {
    adminFetch('/api/logout', {
      method: 'POST'
    })
  }
}

export const adminFetch = (url, config = {}) => {
  const fetchConfig = Object.assign({}, config, {
    headers: {
      token: cookie.load('token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const promise = new Promise((resolve, reject) => {
    fetch(url, fetchConfig)
      .then(res => {
        if (res.status === 403) {
          cookie.remove('token', { path: '/admin' });
          location.pathname = '/admin/login';
          return reject(err);
        }
        resolve(res);
      })
      .catch(err => {
        cookie.remove('token', {path: '/admin'});
        location.pathname = '/admin/login';
        reject(err);
      })
  });
  return promise;
}
