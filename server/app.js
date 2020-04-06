const express = require('express');
const path = require('path');
const compression = require('compression');
const upload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const controller = require('./controller');

const app = express();

app.set('port', process.env.PORT || 4400);
app.disable('x-powered-by');
app.use(upload());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use('/api/v1', controller);
if (process.env.NODE_ENV === 'production') {
  // # npm run build #
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  // Return all requests to our React app.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}
module.exports = app;
