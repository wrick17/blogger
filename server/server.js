const express = require('express')
const next = require('next')
const routes = require('./routes')
const expressMongoDb = require('express-mongo-db');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogger');

app.prepare()
.then(() => {
  const server = express()
    server.use(bodyParser.json())
  
    routes(server, app)

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
