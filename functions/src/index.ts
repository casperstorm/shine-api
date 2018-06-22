<<<<<<< HEAD
import * as functions from "firebase-functions";
import * as express from "express";
import newsRouter from "./routes/news";

const PORT = process.env.PORT || 3000;

const app = express();
// new RequestHandlerParams
app.use("/news", newsRouter);
console.log("hello");
=======
import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'
import * as express from 'express'
import newsRouter from './routes/news'

// admin.initializeApp(functions.config().firebase)

const PORT = process.env.PORT || 3000

const app = express()
app.use('/news', newsRouter)
>>>>>>> kinda working

app.listen(PORT);

export const shine = functions.https.onRequest(app);
