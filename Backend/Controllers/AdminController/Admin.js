import jwt from 'jsonwebtoken'
import Admin from '../../models/Admin.js'
import bcrypt from 'bcrypt'




const generateToken=(id)=>{
    return jwt.sign({id},process.env.SECRETE_KEY,{expiresIn:'2d'})
}
export const Register=async(req,res)=>{
    try{
         const {name,email,password}=req.body;
          if(!name||!email||!password) return res.send(400).json({message:'all fields required'})
                     const AdminExist=await Admin.findOne({email})
                     if(AdminExist){
                      return   res.status(400).json({message:'this email is taken'})
                     }
    await Admin.create({
        name,
        email,
        password,
        
     })
     
    return res.status(201).json({
        name:name,
        email:email,
        password:password
     })
    }catch(err){
         res.status(500).json({message:'error signup the admin',error:err.message})
         
    }
    
}
export const LoginAdmin =async(req,res,next)=>{
     try{
       
        console.log(req.body,'body');
        
        const {email,password}=req.body
        
        if(!email||!password){
           return res.status(400).json({message:"fill out all fields"})
        
        }
         const admin=await Admin.findOne({email});
         if(!admin){
            return res.status(400).json({ message:'Admin not found!'})
         }
           const checkPass =  await bcrypt.compare(password,admin.password);
           if(!checkPass) return res.status(400).json({ message:"Invalid Credentials"})
       return  res.status(201).json({message:"login successful",
          Id:admin._id,
          token:generateToken(admin._id)
         })
     }catch(err){
      
     res.status(500).json({message:'error in login user',error:err.message})
     }

}
