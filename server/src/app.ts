import express from 'express';
import cors from 'cors';
import { rootRouter } from './routes/index';
import { loggerMiddleware } from './middlewares/logger';
import { notFoundMiddleware } from './middlewares/notFound';
import { errorHandlerMiddleware } from './middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use(rootRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
