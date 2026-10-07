import mongoose from 'mongoose';
import HttpError from '../utils/HttpError.js';

let connectionPromise;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new HttpError(
      503,
      'Server setup incomplete: MONGODB_URI is missing. Add it to .env and restart the backend.',
      true,
    );
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    }).catch((error) => {
      connectionPromise = undefined;
      console.error('MongoDB connection failed:', error.message);
      throw new HttpError(
        503,
        'Could not connect to MongoDB. Check MONGODB_URI, your Atlas database user, and Atlas network access.',
        true,
      );
    });
  }

  await connectionPromise;
}
