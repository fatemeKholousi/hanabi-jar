//  login
const { User } = require('./models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const _ = require('lodash')
const Joi = require('joi')
const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('invalid email or password')
  }

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password,
  )
  if (!validatePassword) {
    return res.status(400).send('invalid email or password')
  }
  const token = user.generateAuthToken()
  // return thid._id
  console.log(user)
  res.send({ token, name: user.name, id: user._id, email: user.email })
})

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(255).required(),
  })
  return schema.validate(req)
}

module.exports = router
