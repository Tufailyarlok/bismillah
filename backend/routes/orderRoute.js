import express from'express'
import authUser from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'
import {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe} from '../controllers/ordercontroller.js'
const orderRouter=express.Router();

//admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//user features
orderRouter.post('/userorders',authUser,userOrders);

//verify payment
orderRouter.post('/verify/stripe',authUser,verifyStripe)

export default orderRouter;



