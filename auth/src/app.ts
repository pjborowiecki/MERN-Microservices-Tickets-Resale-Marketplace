import 'express-async-errors';

import express, { type Application } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

import config from './config/index';

import authRouter from './routes/v1/auth.route';

import xss from './middleware/xss.middleware';
import authLimiter from './middleware/rate-limiter.middleware';
import errorHandler from './middleware/error-handler.middleware';
import compressFilter from './lib/compress-filter.lib';
import { NotFoundError } from './lib/errors';

const app: Application = express();

app.use(
  helmet(),
  express.json(),
  xss(),
  cookieParser(),
  compression({ filter: compressFilter }),
  express.urlencoded({ extended: true }),
  cors({
    origin: String(config.cors.origin).split('|'),
    credentials: true,
  }),
);

if (config.node_env === 'production') {
  app.set('trustProxy', 1);
  app.use('/api/v1/auth', authLimiter);
}
app.use('/api/v1/auth', authRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
