import mongoose from 'mongoose'
import asyncHandler from "express-async-handler";

const connectDB = asyncHandler(async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,

        })

        console.log(`MongoDB Connected ${connect.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1)
    }
})

export default connectDB;
