import { history } from 'react-router-dom';
import cookie from 'react-cookies';
import fetch from 'isomorphic-unfetch';

export const authManager = {
  authenticate: (creds, cb = ()=>{}) => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(creds),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(user => {
        cb();
      })
  },
  signout: (cb = ()=>{}) => {
    adminFetch('/api/logout', {
      method: 'POST'
    })
  }
}

export const adminFetch = (url, config = {}, response) => {
  const fetchConfig = Object.assign({}, config, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  });
  const promise = new Promise((resolve, reject) => {
    fetch(url, fetchConfig)
      .then(res => {
        if (res.status === 403) {
          cookie.remove('token', { path: '/' });
          if (response) response.redirect('/admin/login');
          console.log('something happened 1')
          return reject(res.body.message);
        }
        resolve(res);
      })
      .catch(err => {
        cookie.remove('token', {path: '/'});
        if (response) response.redirect('/admin/login');
        console.log('something happened 2')
        reject(err);
      })
  });
  return promise;
}

export const handleize = str => str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
