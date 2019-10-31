const express = require('express')
const db = require('./database')
const basicroute = require('./routes/basicroute')
const mongoose = require("mongoose")
const passport = require("passport")
const app = express()
const port = process.env.PORT || 8081 // process.env.port is Heroku's port
const users = require("./routes/api/users")

// Bodyparser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
  
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
