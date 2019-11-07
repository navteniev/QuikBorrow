const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const basicroute = require('./routes/basicroute');
const passport = require('passport');
const apiRoutes = require('./routes/api/index');
require('./database');

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
app.use('/basicroute', basicroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
