const express = require('express')
const db = require('./database')
const basicroute = require('./routes/basicroute')
const app = express()
const port = process.env.PORT || 8081

app.get("/", (req, res) => {
  res.send("Hello World!")
})

//use this to test if you can connect to database will remove later
app.use("/api", basicroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
