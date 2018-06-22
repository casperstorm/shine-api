const firebase = require("firebase/app");

import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";

import newsRouter from "./routes/news";
import authRouter from "./routes/auth";

const PORT = process.env.PORT || 3000;

const config = functions.config().config;
const firebaseConfig = {
  apiKey: config["api-key"],
  authDomain: config["auth-domain"],
  databaseURL: config["database-url"],
  projectID: config["project-id"],
  storageBucket: config["storage-bucket"],
  messagingSenderId: config["messaging-sender-id"]
};
firebase.initializeApp(firebaseConfig);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/news", newsRouter);
app.use("/auth", authRouter);

app.listen(PORT);

export const shine = functions.https.onRequest(app);
