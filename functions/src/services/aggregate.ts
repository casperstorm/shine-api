import * as _ from "lodash";
import * as moment from "moment";
import { aggregateBitcoin } from "./bitcoin";
import { aggregateBitcoinist } from "./bitcoinist";
import { aggregateCryptovest } from "./cryptovest";
import { aggregateNewsbtc } from "./newsbtc";
import { aggregateTrustnodes } from "./trustnodes";
import { store, query } from "../database/database";

const fetchData = async () => {
  const promises = [
    aggregateBitcoin(),
    aggregateBitcoinist(),
    aggregateCryptovest(),
    aggregateNewsbtc(),
    aggregateTrustnodes()
  ];
  try {
    const res = await Promise.all(promises);
    const concat = _.concat(res);
    const flatten = _.flatten(concat);
    const sorted = _.sortBy(flatten, item => {
      return moment.unix(item.created);
    }).reverse();

    return sorted;
  } catch (error) {
    throw error;
  }
};

const shouldUpdateData = (created: number) => {
  const refreshInterval = 1;
  return moment
    .unix(created)
    .add(refreshInterval, "minutes")
    .isBefore(moment());
};

export const aggregate = async (limit?: number) => {
  console.log(`limiting to ${limit} results`);
  const data = await query();
  const updateData = shouldUpdateData(data.created);

  let items = data.items;

  if (updateData) {
    items = await fetchData();
    store(items);
  }

  if (limit) {
    return items.slice(0, limit);
  } else {
    return items;
  }
};
