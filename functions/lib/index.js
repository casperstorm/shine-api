"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const news_1 = require("./routes/news");
const PORT = process.env || 3000;
const app = express();
// new RequestHandlerParams
app.use('/news', news_1.default);
app.listen(PORT);
exports.shine = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map