const fetch = require('node-fetch')
const _ = require('lodash')

const REDDIT = 'https://www.reddit.com/user/C-Storm/m/cryptos/top.json?sort=new'

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
        type: 'reddit',
        id: item.data.id,
        title: item.data.title,
        description: item.data.selftext,
        url: item.data.url,
        subreddit: item.data.subreddit_name_prefixed,
        created: item.data.created,
        ups: item.data.ups,
        num_comments: item.data.num_comments,
      }
    })
    .filter((item) => {
      return item.description.length > 0
    })
    .value()

  return filter
}

module.exports = aggregateReddit
