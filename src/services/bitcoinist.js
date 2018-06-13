const _ = require('lodash')
const moment = require('moment')
const Parser = require('rss-parser')
const parser = new Parser()

const FEED = 'http://bitcoinist.com/feed/'

const aggregateBitcoinist = async () => {
  try {
    let response = await parser.parseURL(FEED)
    const items = filterBitcoinist(response.items)
    return items
  } catch (error) {
    throw error
  }
}

const filterBitcoinist = async (items) => {
  const filter = _
    .chain(items)
    .map((item) => {
      return {
        source: 'bitcoinist',
        id: item.guid,
        title: item.title,
        description: item.content,
        url: item.link,
        created: moment(item.pubDate, 'ddd DD MMM YYYY HH:mm:ss Z').unix(),
      }
    })
    .value()
  return filter
}

module.exports = aggregateBitcoinist
