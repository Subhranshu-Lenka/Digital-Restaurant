import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);
        if (connectionInstance) {
            console.log("Connected to Mongo Database Successfully.");
        }
        else {
            throw Error("Mongo Authentication Fail Error.")
        }
    } catch (error) {
        console.log("DB Connection Error ", error);
        throw error;
    }
}

export default connectDB;