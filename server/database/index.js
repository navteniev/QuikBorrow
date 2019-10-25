const mongoose = require('mongoose');

let db;

//connection to mongodb
mongoose.connect('mongodb://localhost:27017/quikborrow', { useUnifiedTopology:true, useNewUrlParser: true}, (err) => {
  if (err) {
    console.log('Database Connection error', err);
  } else {
    console.log('Successfully connected to database');
  }
});

//get connection
db = mongoose.connection;
db.on('error', err => {
  console.log('Failed to obtain database connection');
});

db.once('open', () => { 
  console.log('Successfully retrieved database connection');
});

module.exports = db;
