const { Auth } = require('../schema');

function authValidation(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(403).send({ message: 'Not Logged In' });
  Auth.find({ token }, function(err, data) {
    if (err) return res.status(403).send({ message: 'Not Logged In' });
    if (!data.length) return res.status(403).send({ message: 'Not Logged In' });
    next();
  })
}

module.exports = authValidation
