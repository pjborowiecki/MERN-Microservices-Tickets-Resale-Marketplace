import mongoose from 'mongoose';

import { app } from './app';
import { config } from './config/index';

const startServer = async () => {
  try {
    await mongoose.connect(config.database.url);
    console.log('Connected to MongoDB');
    startHttpServer();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const startHttpServer = () => {
  const server = app.listen(Number(config.server.port), () => {
    console.log(`Server running at http://localhost:${config.server.port}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received');
    console.log('Closing HTTP server');
    server.close((error) => {
      console.log('HTTP server closed');
      process.exit(error ? 1 : 0);
    });
  });
};

startServer();
