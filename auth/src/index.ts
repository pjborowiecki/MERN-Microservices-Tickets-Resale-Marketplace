import mongoose from 'mongoose';

import app from './app';
import config from './config/index';
import logger from './middleware/logger.middleware';

const startServer = async () => {
  try {
    await mongoose.connect(config.database.url);
    logger.info('Connected to MongoDB');
    startHttpServer();
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const startHttpServer = () => {
  const server = app.listen(Number(config.server.port), () => {
    logger.info(`Server running at http://localhost:${config.server.port}`);
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received');
    logger.info('Closing HTTP server');
    server.close((error) => {
      logger.info('HTTP server closed');
      process.exit(error ? 1 : 0);
    });
  });
};

startServer();
