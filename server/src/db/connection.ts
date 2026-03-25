import mongoose from "mongoose";
import {DB_URI} from "@/config/db.config";

async function connectToDb(): Promise<void> {
    try {
        await mongoose.connect(DB_URI);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error connecting to MongoDB:', err.message);
            process.exit(1);
        }

        console.error("An unexpected error occurred", err);
        process.exit(1);
    }
}


export default connectToDb;