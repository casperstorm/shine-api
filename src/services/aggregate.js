const _ = require('lodash')
const moment = require('moment')

const aggregateReddit = require('./reddit')
const aggregateTrustnodes = require('./trustnodes')
const aggregateBitcoinist = require('./bitcoinist')
const aggregateNewsbtc = require('./newsbtc')
const aggregateCryptovest = require('./cryptovest')
const aggregateBitcoin = require('./bitcoin')

const aggregate = async () => {
  try {
    let [
      reddit,
      trustnodes,
      bitcoinist,
      newsbtc,
      cryptovest,
      bitcoin,
    ] = await Promise.all([
      aggregateReddit(),
      aggregateTrustnodes(),
      aggregateBitcoinist(),
      aggregateNewsbtc(),
      aggregateCryptovest(),
      aggregateBitcoin(),
    ])
    const concat = _.concat(
      reddit,
      trustnodes,
      bitcoinist,
      newsbtc,
      cryptovest,
      bitcoin
    )
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
