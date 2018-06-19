const express = require('express')
const router = express.Router()
const firebase = require('firebase')
var jwt = require('jsonwebtoken')

router.post('/create-api-token', async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    res.status(401).json('missing either username or password')
  }

  try {
    await login(username, password)
    const token = await createToken(username)
    res.status(201).json({ api_token: token })
  } catch (err) {
    return next(err)
  }
})

router.post('/verify', async (req, res, next) => {
  const token = req.body.token
  if (!token) {
    res.status(401).json('missing token')
  }

  try {
    await validateToken(token)
    res.status(201).json('token is valid')
  } catch (err) {
    res.status(201).json('token is invalid')
  }
})

const login = async (username, password) => {
  return firebase.auth().signInWithEmailAndPassword(username, password)
}

const createToken = async (username) => {
  return jwt.sign({ username }, process.env.JSON_WEB_TOKEN_SECRET)
}

const validateToken = async (token) => {
  return jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET)
}

module.exports = router
