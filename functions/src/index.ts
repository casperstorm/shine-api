import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'
import * as express from 'express'
import newsRouter from './routes/news'

// admin.initializeApp(functions.config().firebase)

const PORT = process.env.PORT || 3000

const app = express()
app.use('/news', newsRouter)

app.listen(PORT);

export const shine = functions.https.onRequest(app);
