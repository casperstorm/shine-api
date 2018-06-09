require('dotenv').config()

const express = require('express')
const newsRouter = require('./routes/news')
const app = express()

const PORT = process.env.PORT || 3000

app.use('/news', newsRouter)

app.listen(PORT, function() {
  console.log('-> http://localhost:3000/news')
})
