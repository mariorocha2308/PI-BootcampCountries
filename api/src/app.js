const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

var allowlist = ['https://pi-countries-one.vercel.app', 'https://pi-countries-fpyrqfmxi-mariorocha2308.vercel.app/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
      
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(cookieParser());
server.use(morgan('dev'));
server.use('/', cors(corsOptionsDelegate), routes);

module.exports = server;
