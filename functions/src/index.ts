import * as functions from 'firebase-functions';
import * as express from 'express'
import newsRouter from './routes/news'

const PORT = process.env || 3000

const app = express()
// new RequestHandlerParams
app.use('/news', newsRouter)

app.listen(PORT)

export const shine = functions.https.onRequest(app);
