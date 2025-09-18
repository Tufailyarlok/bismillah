import express from 'express';
import result from './config/mongodb.js';
import cors from 'cors';
import dotenv from 'dotenv'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js'
dotenv.config();
const port=process.env.PORT || 4000;
const app=express();
app.use(express.json());


result();
connectCloudinary();

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"], // your React app
    credentials: true, // if you send cookies or auth headers
  }));

//api endpoints
app.get('/',(req,res)=>{
    res.send("hello from tufail");
})

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter)

app.listen(port,()=>{
    console.log("your app is listnening at:",port);
})

