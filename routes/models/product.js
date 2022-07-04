const mongoose = require('mongoose')
const Joi = require('joi')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50, minlength: 2 },
  genre: { type: String, maxlength: 50, minlength: 2 },
  author: { type: String, required: true, maxlength: 50, minlength: 2 },
  summary: { type: String, maxlength: 1000, minlength: 10 },
  coverImage: { type: String, required: true },
  stock: { type: Number, required: true, max: 1000, min: 0 },
  publishedYear: { type: String },
})
const Product = mongoose.model('hanabi-jar-books', productSchema)

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    author: Joi.string().min(2).max(50).required(),
    genre: Joi.string().min(2).max(50),
    summary: Joi.string().min(10).max(1000),
    coverImage: Joi.string(),
    stock: Joi.number().required(),
    publishedYear: Joi.string(),
  })
  return schema.validate(product)
}

exports.validate = validateProduct
exports.Product = Product

