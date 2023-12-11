import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const url = process.env.DB_URL;

export const connectDB = async () => {
     try {
       await mongoose.connect(url, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       console.log("MongoDB is connected");
     } catch (error) {
       console.error("Error connecting to MongoDB", error);
     }
}

// export default connectDB;