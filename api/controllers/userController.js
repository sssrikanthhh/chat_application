const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const generateToken = (user) => {
  const jwtKey = process.env.JWT_SECREAT_KEY
  return jwt.sign({ _id: user._id, name: user.name, email: user.emai }, jwtKey, { expiresIn: "7d" })
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" })
    }
    let user = await userModel.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "user already exists with this email address, please provide a new email" })
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "please provide valid email address" })
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ msg: "please provide strong password" })
    }
    user = new userModel({ name, email, password })
    const salt = await bcrypt.genSalt(5)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    const token = generateToken(user)
    return res.status(200).json({ _id: user._id, name: user.name, email: user.email, token })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ err: err.message })
  }
}

module.exports = { registerUser }