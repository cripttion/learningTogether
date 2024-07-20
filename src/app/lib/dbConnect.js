

import mongoose from "mongoose";

const connection = {};
async function dbConnect(){
    if(connection.isConnected){
        console.log("Data base Connected");
        return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database Connected");
}

export default dbConnect;