const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const passport = require('passport');
const apiRoutes = require('./routes/api/index');
const path = require('path');
require('./services/mongodbConnect')(app);

// Bodyparser middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// preventing CORS error
const isPreflight = (req) => {
  return (
    req.method === 'OPTIONS' &&
    req.headers['origin'] &&
    req.headers['access-control-request-method']
  )
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ["*"]);
  res.header('Access-Control-Allow-Methods', ['GET,PUT,POST,DELETE,PATCH']);
  res.header('Access-Control-Allow-Headers', ['Content-Type','Accept','Access-Control-Allow-Origin']);
  if (isPreflight(req)) {
    res.status(204).end()
    return
  }
  next();
});

// Routes
app.use('/api', apiRoutes);

app.use(express.static('../client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.once('ready', () => {
  app.listen(port, () => {
    console.log(`Database connected. App listening on port ${port}!`);
  });
});

module.exports = app;
