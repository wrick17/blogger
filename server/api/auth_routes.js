const { Auth } = require('./schema');

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function authRoutes(server, app) {

  Auth.find(function(err, users) {
    if (!users.length) {
      const user = new Auth({
        username: 'admin',
        password: 'password'
      });
      user.save(function(err, result) {
        if (err) console.error(err);
        else console.log('default user created successfully');
      })
    }
  })

  server.post('/api/login', (req, res) => {
    Auth.find(req.body, function(err, result) {
      if (result.length > 0) {
        const user = result[0];
        const token = makeid();
        Auth.update({ _id: user._id }, { $set: { token } }, function(error) {
          if (error) res.status(401).send({
            success: false,
          })
          res.status(201).send({
            username: user.username,
            token
          })
        })
      } else {
        res.status(401).send({
          success: false,
        })
      }
    })
  })

  server.post('/api/logout', (req, res) => {
    const token = req.get('token');
    Auth.find({ token }, function (err, result) {
      if (!result.length) return res.status(401).send({
        success: false,
      })
      const user = result[0];
      Auth.update({ _id: user._id }, { $unset: { token } }, function (error) {
        if (error || !result.length) res.status(401).send({
          success: false,
        })
        res.status(201).send({
          success: true,
        })
      })
    })
  })

}

module.exports = authRoutes
