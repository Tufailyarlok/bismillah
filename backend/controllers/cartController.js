import userModel from "../models/userModel.js";


//add products to user cart
const addToCart=async(req,res)=>{
    try{
        const {itemId,size} = req.body
        const userId=req.userId;

        const userData=await userModel.findById(userId);
        let cartData = { ...userData.cartData };

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1;
        }

        await userModel.findByIdAndUpdate(
            userId,
            { $set: { cartData } },
            { new: true }
          );
        res.json({success:true, message:"added to cart"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err.message})
        
    }
}

//update user cart
const updateCart=async(req,res)=>{
    try{
        const {itemId,size,quantity}=req.body
        const userId=req.userId;
        const userData=await userModel.findById(userId);
        let cartData = { ...userData.cartData };
        if (!cartData[itemId]) cartData[itemId] = {};

        if (quantity > 0) {
            cartData[itemId][size] = quantity;
          } else {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
              delete cartData[itemId];
            }
          }
          
        
          const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { cartData } },
            { new: true }
          );
      
          res.json({ success: true, message: "Cart updated", cartData: updatedUser.cartData });

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err.message})
    }
}

//get user cart data
const getUserCart=async(req,res)=>{
    try{
        const userId=req.userId
        const userData=await userModel.findById(userId);
        // let cartData=await userData.cartData;

        res.json({success:true,cartData:userData.cartData})

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err.message})
    }

}

export {addToCart,updateCart,getUserCart};