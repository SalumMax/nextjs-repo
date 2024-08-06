import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
//   mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDB is already connected");
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (typeof uri !== 'string') {
    console.error("MONGODB_URI is not a valid string.");
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
    connected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Something's wrong with DB:", error);
  }
};

export default connectDB;