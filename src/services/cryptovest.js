const _ = require('lodash')
const moment = require('moment')
const Parser = require('rss-parser')
const parser = new Parser()

const FEED = 'https://cryptovest.com/feed/'

const aggregateCryptovest = async () => {
  try {
    let response = await parser.parseURL(FEED)
    const items = filterCryptovest(response.items)
    return items
  } catch (error) {
    throw error
  }
}

const filterCryptovest = async (items) => {
  const filter = _
    .chain(items)
    .map((item) => {
      return {
        source: 'cryptovest',
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

module.exports = aggregateCryptovest
