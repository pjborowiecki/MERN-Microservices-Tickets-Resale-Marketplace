import config from './config';
import logger from './middleware/logger.middleware';
import app from './app';

const server = app.listen(Number(config.server.port), () => {
  logger.log(
    'info',
    `Server running at http://localhost:${config.server.port}`
  );
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing HTTP server.');
  server.close((error) => {
    logger.info('Http server closed.');
    process.exit(error ? 1 : 0);
  });
});
