const fetch = require('node-fetch')
const _ = require('lodash')

const REDDIT =
  'https://www.reddit.com/user/C-Storm/m/cryptos/top.json?sort=new&limit=100'

const aggregateReddit = async () => {
  try {
    let response = await fetch(REDDIT)
    let data = await response.json()
    const items = filterReddit(data)
    return items
  } catch (error) {
    throw error
  }
}

const filterReddit = async (response) => {
  /*
    Example of API response can be found here:
    https://www.reddit.com/r/nintendo/top.json?sort=new
  */
  const items = response.data.children
  const filter = _
    .chain(items)
    .map((item) => {
      return {
        source: item.data.subreddit_name_prefixed,
        id: item.data.id,
        title: item.data.title,
        description: item.data.selftext,
        url: item.data.url,
        created: item.data.created,
      }
    })
    .filter((item) => {
      return item.description.length > 0
    })
    .value()

  return filter
}

module.exports = aggregateReddit
