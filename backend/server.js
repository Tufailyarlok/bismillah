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

// // ✅ Convert comma-separated env string to array
// const allowedOrigins = process.env.ALLOWED_ORIGINS
//   ? process.env.ALLOWED_ORIGINS.split(",")
//   : [];

const allowedOrigins = [
  "http://localhost:5173",   // local frontend
  "http://localhost:5174",   // local admin (if used)
  "https://bismillahfrontend.vercel.app", // deployed frontend
  "https://bismillahadmin.vercel.app"     // deployed admin
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


 app.get("/", (req, res) => {
    res.send("Backend is working ");
  });
  

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter)

app.listen(port,()=>{
    console.log("your app is listnening at:",port);
})

// export default app;