import mongoose from "mongoose";
import env from './env';

export default async() => {
  try {
    await mongoose.connect(env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};