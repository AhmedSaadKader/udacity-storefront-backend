import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import itemRouter from './routes/itemRoutes';

dotenv.config();

const app: express.Application = express();
const port: string = process.env.PORT || '5000';
const address = `localhost:${port}`;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.use('/items', itemRouter);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
