import * as _ from 'lodash'
import * as moment from 'moment'
import { aggregateBitcoin } from './bitcoin'

export const aggregate = async () => {
  try {
    const [
      bitcoin,
    ] = await Promise.all([
      aggregateBitcoin(),
    ])
    const concat = _.concat(
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