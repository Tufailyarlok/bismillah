import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js'
//function for add product
const addProduct=async(req,res)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestSeller}=req.body
        const image1 = req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files.image4 ? req.files.image4[0] : null;
        
        const images=[image1,image2,image3,image4].filter((item)=> item!= null)
        
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )

        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller === "true"? true: false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }
        console.log(productData);
        const product =new productModel(productData);
        await product.save();

        res.json({success:true, message:"product Added"});

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err.message});
    }
}

//function for list products
const listProducts=async(req,res)=>{
    try{
        const products=await productModel.find({});
        res.json({success:true,products})
    }   
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

//function for removing product
const removeProduct=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"product removed"})
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

//function for sinlge product info
const singleProduct=async(req,res)=>{
    try{
        const {productId}=req.body
      const product = await productModel.findById(productId)
      console.log(product);
      res.json({success:true,product});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

export {listProducts,addProduct,removeProduct,singleProduct};