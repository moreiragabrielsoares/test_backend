import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import logger from './logger';
import pinoHttp from 'pino-http';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { denylistOfCpfsRouter } from './routes/denylistOfCpfsRoute';

const app = express();

app.use(cors());
app.use(json());
app.use(pinoHttp({ logger }));
app.use(denylistOfCpfsRouter);
app.use(errorHandler);

export { app };
