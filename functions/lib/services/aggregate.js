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
const bitcoin_1 = require("./bitcoin");
exports.aggregate = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const [bitcoin,] = yield Promise.all([
            bitcoin_1.aggregateBitcoin(),
        ]);
        const concat = _.concat(bitcoin);
        const flatten = _.flatten(concat);
        const sorted = _
            .sortBy(flatten, (item) => {
            return moment(item.created);
        })
            .reverse();
        return sorted;
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=aggregate.js.map