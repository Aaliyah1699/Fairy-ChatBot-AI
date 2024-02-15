import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    throw new Error('Cannot connect to db.');
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(`Error: ${error}`);
    throw new Error(' Could not disconnect db.');
  }
};

export {connectDB, disconnectDB};
