import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


//route for user login
const loginUser = async(req,res)=>{
        try{
            const {email,password}=req.body;
            const saved_person=await userModel.findOne({email});
            if(!saved_person) return res.json({success:false, message:"no user found for this email"});

            const ismatch=await bcrypt.compare(password,saved_person.password);

            if(ismatch){
                const token=createToken(saved_person.id);
                res.status(200).json({
                    success: true,
                    token,
                    user: saved_person // sending whole user object
                  });            }
            else{
                res.json({success:false, message:"incorrect password"})
            }
        }
        catch(err){
            console.log(err);
            res.status(400).json({error:err.message});
        }
    
}

//route for user register

const registerUser= async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const exists=await userModel.findOne({email}); 
        if(exists) return res.json({success:false, message:"user already exists"});
        
        //now validate email format and strong password
        if(!validator.isEmail(email)){
           return res.json({success:false, message:"please enter a valid email"});
        }
        if(!validator.isStrongPassword(password)){
           return res.json({success:false, message:"password is weak"});
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newUser=new userModel({
            name,email,password:hashedpassword
        })
        const user=await newUser.save();

        const token=createToken(user._id);
        res.json({success:true,token});

    }
    catch(err){
        console.error(err);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

//route for admin login
const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"invalid credential"});
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({success:false, message:err.message});

    }
}


export {loginUser,registerUser,adminLogin};