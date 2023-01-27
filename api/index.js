const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db')

const userRoutes = require('./routes/userRoutes')

const port = process.env.port || 8080
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/users/', userRoutes)
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})