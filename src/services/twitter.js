const _ = require('lodash')
const moment = require('moment')
const Twitter = require('twitter-lite')

const aggregateTwitter = async () => {
  const client = new Twitter({
    subdomain: 'api',
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  try {
    let response = await client.get('search/tweets', { q: query() })
    const items = filterTwitter(response)
    return items
  } catch (error) {
    throw error
  }
}

const filterTwitter = async (response) => {
  /*
    Example of API response can be found here:
    https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html
  */
  const items = response.statuses
  const filter = _
    .chain(items)
    .filter((item) => {
      if (item.lang !== 'en') return false
      if (item.user.followers_count < 1000) return false
      if (item.text.toLowerCase().indexOf('free') > -1) return false
      if (item.text.toLowerCase().indexOf('airdrop') > -1) return false
      if (item.text.toLowerCase().indexOf('give away') > -1) return false
      if (item.text.charAt(0) === '@') return false
      return true
    })
    .uniqBy((item) => item.id_str)
    .map((item) => {
      return {
        type: 'twitter',
        id_str: item.id_str,
        title: item.text,
        created: moment(item.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').unix(),
        url: 'https://twitter.com/-/status/' + item.id_str,
        user: item.user.screen_name,
      }
    })
    .value()

  return filter
}

const query = () => {
  return '#crypto OR crypto OR coin OR blockchain OR bitcoin OR $btc OR ethereum OR $eth OR ICO AND -filter:retweets'
}

module.exports = aggregateTwitter
