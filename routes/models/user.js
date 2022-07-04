const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50, minlength: 2 },
  email: { type: String, unique: true, required: true, minlength: 6 },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 8,
    required: true,
  },
  isAdmin: Boolean,
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey,
  )
  return token
}

const User = mongoose.model('hanabi-jar-users', userSchema)

const validateUser = (userInfo) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(255).required(),
  })
  return schema.validate(userInfo)
}

exports.validate = validateUser
exports.User = User
