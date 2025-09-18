import jwt from 'jsonwebtoken';
const adminAuth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1];
        if(!token) return res.json({success:false , message:"not authorized"});
        const result=jwt.verify(token,process.env.JWT_SECRET);
        if(result!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)
            return res.json({success:false , message:"not authorized"}); 
        
        next();
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err});
    }
  
}
export default adminAuth;