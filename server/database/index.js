const mongoose = require('mongoose');

// connection to mongodb
const uri = 'mongodb+srv://QuikBorrowDev:QuikDev@quikborrow-yyzmu.mongodb.net/test?retryWrites=true&w=majority';
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'QuikBorrow',
};

mongoose.connect(uri, options)
    .then(() => console.log('Successfully connected to database'))
    .catch((err) => console.log('Database Connection error', err));

// get connection
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('Failed to obtain database connection', err);
});

db.once('open', () => {
  console.log('Successfully retrieved database connection');
});

module.exports = db;
