import * as _ from "lodash";
import * as moment from "moment";
import * as Parser from "rss-parser";
import * as uuid from "uuid/v4";

const parser = new Parser();
const FEED = "https://www.trustnodes.com/feed";

export const aggregateTrustnodes = async () => {
  try {
    const response = await parser.parseURL(FEED);
    const items = filterTrustnodes(response.items);
    return items;
  } catch (error) {
    throw error;
  }
};

const filterTrustnodes = async items => {
  const filter = _.chain(items)
    .map(item => {
      return {
        source: "trustnodes",
        id: uuid(),
        title: item.title,
        url: item.link,
        created: moment(item.pubDate, "ddd DD MMM YYYY HH:mm:ss Z").unix()
      };
    })
    .value();
  return filter;
};
