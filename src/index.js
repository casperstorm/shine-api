require('dotenv').config()

const express = require('express')
const jwtCheck = require('express-jwt')
const bodyParser = require('body-parser')

const app = express()
const newsRouter = require('./routes/news')
const authRouter = require('./routes/auth')
const firebase = require('./utils/firebase')

const PORT = process.env.PORT || 3000

firebase.setup()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  '/news',
  jwtCheck({
    secret: process.env.JSON_WEB_TOKEN_SECRET,
  })
)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json('invalid token')
  }
})

app.use('/auth', authRouter)
app.use('/news', newsRouter)

app.listen(PORT, () => {})
