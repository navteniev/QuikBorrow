const mongoose = require('mongoose');

let db;

//connection to mongodb
mongoose.connect('mongodb://localhost:27017/quikborrow', { useUnifiedTopology:true, useNewUrlParser: true})
.then(() => console.log('Successfully connected to database'))
.catch(err => console.log('Database Connection error', err));

//get connection
db = mongoose.connection;
db.on('error', err => {
  console.log('Failed to obtain database connection');
});

db.once('open', () => { 
  console.log('Successfully retrieved database connection');
});

module.exports = db;
