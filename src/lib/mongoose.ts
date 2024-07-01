import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let isConnected = false;

const MONGODB_URI = process.env.MONGODB_URI || " ";

async function connect() {
  if (isConnected) {
    return;
  } else {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
    } as ConnectOptions);

    isConnected = true;
  }
}

export default connect;
