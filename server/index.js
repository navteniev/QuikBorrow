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


// Routes
app.use('/api', apiRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
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
