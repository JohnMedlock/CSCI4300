import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'MyStudySpace',
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectMongoDB;

