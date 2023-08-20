import express, { type Express } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import config from './config';

import xss from './middleware/xss.middleware';
import authLimiter from './middleware/rateLimiter.middleware';
import errorHandler from './middleware/errorHandler.middleware';
import compressFilter from './lib/compressFilter.lib';

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(cookieParser());
app.use(compression({ filter: compressFilter }));
app.use(
  cors({
    origin: String(config.cors.origin).split('|'),
    credentials: true
  })
);

if (config.node_env === 'production') {
  app.use('/api/v1/auth', authLimiter);
}

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

export default app;
