const express = require('express')
const aggregate = require('../services/aggregate')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const data = await aggregate()
    res.json(data)
  } catch (error) {
    res.json({ error: 'error getting news items' })
  }
})

module.exports = router
