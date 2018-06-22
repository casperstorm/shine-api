import * as functions from "firebase-functions";
import * as express from "express";
import newsRouter from "./routes/news";

const PORT = process.env.PORT || 3000;

const app = express();
// new RequestHandlerParams
app.use("/news", newsRouter);
console.log("hello");

app.listen(PORT);

export const shine = functions.https.onRequest(app);
