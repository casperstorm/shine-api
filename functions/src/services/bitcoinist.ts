import * as _ from "lodash";
import * as moment from "moment";
import * as Parser from "rss-parser";
import * as uuid from "uuid/v4";

const parser = new Parser();
const FEED = "http://bitcoinist.com/feed/";

export const aggregateBitcoinist = async () => {
  try {
    const response = await parser.parseURL(FEED);
    const items = filterBitcoinist(response.items);
    return items;
  } catch (error) {
    throw error;
  }
};

const filterBitcoinist = async items => {
  const filter = _.chain(items)
    .map(item => {
      return {
        source: "bitcoinist",
        id: uuid(),
        title: item.title,
        url: item.link,
        created: moment(item.pubDate, "ddd DD MMM YYYY HH:mm:ss Z").unix()
      };
    })
    .value();
  return filter;
};
