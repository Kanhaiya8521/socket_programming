
import mongoose from 'mongoose';
const url = "mongodb://127.0.0.1:27017/chatApp";
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