import mongoose from "mongoose";

// @ts-ignore
mongoose.connect(process.env.MONGODB_CONNECTION_ADDRESS)