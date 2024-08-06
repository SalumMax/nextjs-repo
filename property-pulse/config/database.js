import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, // Optional as it's deprecated
            useUnifiedTopology: true, // Optional as it's deprecated
            serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process if connection fails
    }
};

export default connectDB;