import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'
import { dbConnection } from './database/config.js'
import authRouter from './routes/auth.js';
import eventsRouter from './routes/events.js';
dotenv.config();

const app = express();

dbConnection();

app.use(cors())
app.use(express.static('public'));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server runing on port ${process.env.PORT}`)
})