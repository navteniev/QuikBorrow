const express = require('express')
const basicroute = require('./routes/basicroute')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const app = express()
const port = process.env.PORT || 8081 // process.env.port is Heroku's port
const users = require("./routes/api/users")

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
// DB Config
const db = require("./config/keys").mongoURI
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))
  
// Passport middleware
app.use(passport.initialize())
// Passport config
require("./config/passport")(passport)
// Routes
app.use("/api/users", users)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

//use this to test if you can connect to database will remove later
app.use("/api", basicroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
