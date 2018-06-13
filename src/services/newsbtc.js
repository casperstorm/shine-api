const _ = require('lodash')
const moment = require('moment')
const Parser = require('rss-parser')
const parser = new Parser()

const FEED = 'https://www.newsbtc.com/feed/'

const aggregateNewsbtc = async () => {
  try {
    let response = await parser.parseURL(FEED)
    const items = filterNewsbtc(response.items)
    return items
  } catch (error) {
    throw error
  }
}

const filterNewsbtc = async (items) => {
  const filter = _
    .chain(items)
    .map((item) => {
      return {
        source: 'newsbtc',
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

module.exports = aggregateNewsbtc
