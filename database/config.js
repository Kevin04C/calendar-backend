import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected")
  } catch (error) {
    console.log('can not connect to db');
    throw error;
  }
}