import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import routes from '../routes/index.ts';
import cookieParser from 'cookie-parser';

config();

const port = process.env.PORT || 3100;
const app = express();

app.use(cors())
.use(bodyParser.json())
.use(express.json())
.use(cookieParser())
.use(express.urlencoded({extended: true}))
.use('/', routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });