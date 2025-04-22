import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB using Mongoose.
 *
 * Reads the connection string from the `MONGODB_URI` environment variable.
 * Logs a success or error message based on the connection outcome.
 *
 * @returns {Promise<void>} Resolves when the connection is successful
 * @throws {Error} If the URI is missing or connection fails
 */
const connectMongoDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("Error connecting to MongoDB:", (error as Error).message);
  }
};

export default connectMongoDB;
