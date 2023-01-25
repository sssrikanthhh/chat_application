const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URI)
    console.log('==> Database Connected')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB