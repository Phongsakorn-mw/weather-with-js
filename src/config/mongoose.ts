import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/weather-log";

const connectMDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.log('❌ MongoDB connection failed:', err);
        process.exit(1);
    }
}

export default connectMDB;
