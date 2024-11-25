import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})


 const Connection = async()=>{
    try{
        // await mongoose.connect(process.env.URI)
        // console.log("Connected")
       await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Increase the timeout to 5 seconds
            socketTimeoutMS: 45000, // Increase the socket timeout to 45 seconds
          })
          .then(() => {
            console.log("MongoDB connected");
          })
          .catch((err) => {
            //console.error("MongoDB connection error:", err);
            console.error("MongoDB connection error:", err);
          });

    }catch(err){
        console.log("Error:" + err.message)

    }
}

 export {Connection};