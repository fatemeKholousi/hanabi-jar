const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) res.status(401).send('ACCESS DENIED. NO TOKEN PROVIDED')

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey)
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send('invalid token')
  }
}

module.exports = auth
