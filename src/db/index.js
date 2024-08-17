import mongoose from "mongoose";
import {DB_NAME} from "../contants.js"

const connectDB = async () =>{

  try {
    // console.log(process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    console.log(`\n MongoDB connected!! DB Host : ${connectionInstance.connections.host}`)

    console.log(connectionInstance);
  } catch (error) {
    console.log("MongoDB connection error ", error);
  } 

}

export default connectDB;