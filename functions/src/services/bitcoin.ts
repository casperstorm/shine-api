import * as _ from 'lodash'
import * as moment from 'moment'
// import * as Parser from 'rss-parser'
// const parser = new Parser()

const FEED = 'https://news.bitcoin.com/feed/'

export const aggregateBitcoin = async () => {
  try {
    // const response = await parser.parseURL(FEED)
    // const items = filterBitcoin(response.items)
    // return items
    return []
  } catch (error) {
    throw error
  }
}

const filterBitcoin = async (items) => {
  const filter = _
    .chain(items)
    .map((item) => {
      return {
        source: 'bitcoin',
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