const _ = require('lodash')
const moment = require('moment')

const aggregateReddit = require('./reddit')
const aggregateTwitter = require('./twitter')

const aggregate = async () => {
  try {
    let [reddit, twitter] = await Promise.all([
      aggregateReddit(),
      aggregateTwitter(),
    ])
    const concat = _.concat(reddit, twitter)
    const flatten = _.flatten(concat)
    const sorted = _
      .sortBy(flatten, (item) => {
        return moment(item.created)
      })
      .reverse()
    return sorted
  } catch (error) {
    throw error
  }
}

module.exports = aggregate
