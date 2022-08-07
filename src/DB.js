import mongoose from "mongoose";
require("dotenv").config()

export default async () => {
    await mongoose.connect(process.env.PATH_DB_WEB);
    return mongoose
}