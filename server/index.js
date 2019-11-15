const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const passport = require('passport');
const apiRoutes = require('./routes/api/index');
require('./services/mongodbConnect')(app);

// Bodyparser middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api', apiRoutes);

app.once('ready', () => {
  app.listen(port, () => {
    console.log(`Database connected. App listening on port ${port}!`);
  });
});

module.exports = app;
