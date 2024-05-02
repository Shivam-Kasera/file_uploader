import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Datebase is connected to : ${conn.connection.host}`)
    }catch (error){
        console.log(error.message)
    }
}