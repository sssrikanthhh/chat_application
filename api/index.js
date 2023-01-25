const express = require('express')
const cors = require('cors')
const port = process.env.port || 8080
const app = express()
app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})