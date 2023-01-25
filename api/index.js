const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db')
const port = process.env.port || 8080
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

connectDB()

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})