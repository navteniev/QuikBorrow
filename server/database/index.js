const mongoose = require("mongoose");

let db;

//connection to mongodb
const uri =
  "mongodb+srv://QuikBorrowDev:QuikDev@quikborrow-yyzmu.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(
    uri,
    { useUnifiedTopology: true, useNewUrlParser: true, dbName: "QuikBorrow" }
  )
  .then(() => console.log("Successfully connected to database"))
  .catch(err => console.log("Database Connection error", err));

//get connection
db = mongoose.connection;
db.on("error", err => {
  console.log("Failed to obtain database connection");
});

db.once("open", () => {
  console.log("Successfully retrieved database connection");
});

module.exports = db;
