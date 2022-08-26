const express = require('express')
const auth = require('../middleware/auth')
const multer = require('multer')
const admin = require('../middleware/admin')
const { Product, validate: validateProduct } = require('./models/product')
const router = express.Router()
const fs = require('fs')

function removeImageLocally(path) {
  try {
    fs.unlinkSync(path)
    //file removed
  } catch (err) {
    console.error(err)
  }
}

//  multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Math.random().toString() + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  //reject a file
  // if(!file.path)
  // console.log("file path has problem")
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true)
  else cb(null, false)
}
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
})

router.get('/', async (req, res) => {
  const products = await Product.find()
  // const products = await Product.find().sort('name')

  res.send(products)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).send('this is a 404, not found')
  res.send(product)
})

//don't forget json type in postman
router.post('/', auth, upload.single('coverImage'), async (req, res) => {
  const { error } = validateProduct(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  let product = new Product({
    name: req.body.name,
    genre: req.body.genre,
    author: req.body.author,
    summary: req.body.summary,
    coverImage: req.file.path,
    stock: req.body.stock,
    publishedYear: req.body.publishedYear,
  })
  product = await product.save()
  res.send(product)
})

router.put('/:id', auth, upload.single('coverImage'), async (req, res) => {
  const { error } = validateProduct(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    genre: req.body.genre,
    author: req.body.author,
    summary: req.body.summary,
    stock: req.body.stock,
    publishedYear: req.body.publishedYear,
    coverImage: req.file.path,
  })
  if (!product) return res.status(404).send('this is a 404, not found')
  res.send(product)
})

router.patch('/:id', auth, upload.single('coverImage'), async (req, res) => {
  const { error } = validateProduct(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    genre: req.body.genre,
    author: req.body.author,
    summary: req.body.summary,
    stock: req.body.stock,
    publishedYear: req.body.publishedYear,
    coverImage: req.file?.path,
  })

  if (!product) return res.status(404).send('this is a 404, not found')
  res.send(product)
})
router.delete('/:id', [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id)
  removeImageLocally(product.coverImage)
  if (!product) return res.status(404).send('this is a 404, not found')
  res.send(product)
})

module.exports = router
