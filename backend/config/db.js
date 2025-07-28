import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ||'mongodb://127.0.0.1:27017/CareerHub');
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
