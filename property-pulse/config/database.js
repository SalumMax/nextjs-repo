import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  try {
     await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Something's wrong with DB:", error);
  }
  
};

export default connectDB;
