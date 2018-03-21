const { Auth } = require('../api/schema');

function authValidation(req, res, next) {
  next();
  const token = req.cookies.token;
  if (req.originalUrl.startsWith('/admin/login')) {
    // if (token) return res.status(302).redirect('/admin/edit')
    next();
  } else {
    if (!token) return res.status(302).redirect(`/admin/login?redirect=${encodeURIComponent(req.originalUrl)}`);
    Auth.find({ token }, function (err, data) {
      if (err) return res.status(300).redirect(`/admin/login?redirect=${encodeURIComponent(req.originalUrl)}`);
      if (!data.length) return res.status(300).redirect(`/admin/login?redirect=${encodeURIComponent(req.originalUrl)}`);
      next();
    })
  }
}

module.exports = authValidation
