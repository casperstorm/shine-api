"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const moment = require("moment");
// import * as Parser from 'rss-parser'
// const parser = new Parser()
const FEED = 'https://news.bitcoin.com/feed/';
exports.aggregateBitcoin = () => __awaiter(this, void 0, void 0, function* () {
    try {
        // const response = await parser.parseURL(FEED)
        // const items = filterBitcoin(response.items)
        // return items
        return [];
    }
    catch (error) {
        throw error;
    }
});
const filterBitcoin = (items) => __awaiter(this, void 0, void 0, function* () {
    const filter = _
        .chain(items)
        .map((item) => {
        return {
            source: 'bitcoin',
            id: item.guid,
            title: item.title,
            description: item.content,
            url: item.link,
            created: moment(item.pubDate, 'ddd DD MMM YYYY HH:mm:ss Z').unix(),
        };
    })
        .value();
    return filter;
});
//# sourceMappingURL=bitcoin.js.map