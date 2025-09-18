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

// ✅ Convert comma-separated env string to array
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

  app.use(cors({
    origin: [
      "https://bismillahadmin.vercel.app",
      "https://bismillahfrontend.vercel.app"
    ],
    credentials: true,
  }));
  


app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter)

app.listen(port,()=>{
    console.log("your app is listnening at:",port);
})

