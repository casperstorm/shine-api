const aggregateReddit = require('./reddit')

const aggregate = async () => {
  try {
    const reddit = await aggregateReddit()
    return reddit
  } catch (error) {
    throw error
  }
}

module.exports = aggregate
