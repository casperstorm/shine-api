const _ = require('lodash')
const moment = require('moment')
const Parser = require('rss-parser')
const parser = new Parser()

const FEED = 'https://www.trustnodes.com/feed'

const aggregateTrustnodes = async () => {
  try {
    let response = await parser.parseURL(FEED)
    const items = filterTrustnodes(response.items)
    return items
  } catch (error) {
    throw error
  }
}

const filterTrustnodes = async (items) => {
  const filter = _
    .chain(items)
    .map((item) => {
      return {
        source: 'trustnodes',
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

module.exports = aggregateTrustnodes
