import mongoose from 'mongoose';
import config from '../config';
import app from './app';

const run = () => {
  try {
    mongoose.connect(config.database_uri as string);
    console.log('Database connected');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connet Database`, error);
  }
};

run();
