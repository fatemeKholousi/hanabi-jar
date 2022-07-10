const express = require('express')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const products = require('./routes/products')
const users = require('./routes/users')
const auth = require('./routes/auth')
const app = express()

require('dotenv').config()
// require('./startup/prod')(app)

if (!process.env.jwtPrivateKey) {
  console.error('Fatal Error:JWT Private Key is not defined')
  process.exit(1)
}

const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost/hanabi-jar-backend')
  .then(() => console.error('you connected to hanabi jar backend'))
  .catch((error) => console.log(error))

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/products', products)
app.use('/api/users', users)
app.use('/api/login', auth)

const port = process.env.PORT || 5555
app.listen(port, () => console.log(`listening from port ${port}`))
