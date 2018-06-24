import * as _ from "lodash";
import * as moment from "moment";
import { aggregateBitcoin } from "./bitcoin";
import { aggregateBitcoinist } from "./bitcoinist";
import { aggregateCryptovest } from "./cryptovest";
import { aggregateNewsbtc } from "./newsbtc";
import { aggregateTrustnodes } from "./trustnodes";

export const aggregate = async () => {
  try {
    const [
      bitcoin,
      bitcoinist,
      cryptovest,
      newsbtc,
      trustnodes
    ] = await Promise.all([
      aggregateBitcoin(),
      aggregateBitcoinist(),
      aggregateCryptovest(),
      aggregateNewsbtc(),
      aggregateTrustnodes()
    ]);
    const concat = _.concat([
      bitcoin,
      bitcoinist,
      cryptovest,
      newsbtc,
      trustnodes
    ]);
    const flatten = _.flatten(concat);
    const sorted = _.sortBy(flatten, item => {
      return moment(item.created);
    }).reverse();
    return sorted;
  } catch (error) {
    throw error;
  }
};
