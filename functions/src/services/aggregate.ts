import * as _ from "lodash";
import * as moment from "moment";
import { aggregateBitcoin } from "./bitcoin";
import { aggregateBitcoinist } from "./bitcoinist";
import { aggregateCryptovest } from "./cryptovest";
import { aggregateNewsbtc } from "./newsbtc";
import { aggregateTrustnodes } from "./trustnodes";
import { store, query } from "../database/database";

const fetchData = async () => {
  const items = await aggregateBitcoin();
  await store(items, "items");

  return items;
  // try {
  //   const [
  //     bitcoin
  //     // bitcoinist,
  //     // cryptovest,
  //     // newsbtc,
  //     // trustnodes
  //   ] = await Promise.all([
  //     aggregateBitcoin()
  //     // aggregateBitcoinist(),
  //     // aggregateCryptovest(),
  //     // aggregateNewsbtc(),
  //     // aggregateTrustnodes()
  //   ]);
  //   const concat = _.concat([
  //     bitcoin
  //     // bitcoinist,
  //     // cryptovest,
  //     // newsbtc,
  //     // trustnodes
  //   ]);
  //   const flatten = _.flatten(concat);
  //   const sorted = _.sortBy(flatten, item => {
  //     return moment(item.created);
  //   }).reverse();
  //   return sorted;
  // } catch (error) {
  //   throw error;
  // }
};

const shouldUpdateData = (created: number) => {
  const refreshInterval = 1;
  return moment
    .unix(created)
    .add(refreshInterval, "minutes")
    .isBefore(moment());
};

export const aggregate = async () => {
  const data = await query();
  const updateData = shouldUpdateData(data.created);

  if (updateData) {
    return await fetchData();
  } else {
    return data.items;
  }
};
