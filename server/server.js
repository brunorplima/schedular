import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventRoute from './routes/eventRoute.js';
import taskRoute from './routes/taskRoute.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.use('/events', eventRoute);
app.use('/tasks', taskRoute);

const mongooseCongif = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: true
}

mongoose.connect(process.env.CONN_URL, mongooseCongif, (err) => {
   if (err) throw new Error(err.message);
   app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
   })
});

