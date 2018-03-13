const { Auth } = require('../schema');

function validateAuthentication(req, res, next) {
  const token = req.get('token');
  Auth.find({ token }, function(err, data) {
    if (err) return res.status(400).send(err);
    if (!data.length) return res.status(403).send({
      message: 'Not Logged In'
    });
    next();
  })
}

module.exports = validateAuthentication
