import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import itemRouter from './routes/itemRoutes';
import userRouter from './routes/userRoutes';
import orderRouter from './routes/orderRoutes';
import dashboardRouter from './services/dashboard/dashboardRoutes';

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

app.use('/api/v1/users', userRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/dashboard', dashboardRouter);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
