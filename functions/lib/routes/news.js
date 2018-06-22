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
const express_1 = require("express");
const aggregate_1 = require("../services/aggregate");
const router = express_1.Router();
exports.default = router;
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const data = yield aggregate_1.aggregate();
        res.json(data);
    }
    catch (error) {
        res.json({ error: 'error getting news items' });
    }
}));
//# sourceMappingURL=news.js.map