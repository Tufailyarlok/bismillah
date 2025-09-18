import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const result=async()=>{
    try{
        mongoose.connection.on('connected',()=>{
            console.log("my database connected");
        })
        mongoose.connection.on('disconnnected',()=>{
            console.log("my database disconnected");
        })
        await mongoose.connect(process.env.MONGODB_URI);
    }
    catch(err){
        console.log(err);
    }
}

export default result;