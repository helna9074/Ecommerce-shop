import Address from "../../models/Address.js"

export const GetAddress=async(req,res)=>{
    try{
        const userId=req.userId
        console.log('this is the user',userId)
        const addressess=await Address.find({user:userId}).sort({createdAt:-1}).lean();
       console.log('this is the address',addressess)
        if (addressess.length === 0) {
  return res.status(200).json({ message: "no addresses found", addressess: [] });
}

      return res.status(200).json({message:"fetched successfully",addressess})
    }catch(err){
      console.log(err)
 return res.status(500).json({message:"fetching address failed"})
    }
}
export const Updateaddress=async(req,res)=>{
    try{
        const userId=req.userId
        const id=req.params.id
        const data=req.body
        if(!data||data.length===0) return res.status(400).json({message:"data is not provided"})
        if(!id) return res.status(400).json({message:"id is not provided"})
        const updatedAddress=await Address.findByIdAndUpdate(id,data,{new:true})
       if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
        return res.status(200).json({message:"address updated successfully",updatedAddress})
    }catch(err){
      console.log(err)
   return res.status(500).json({message:"error in updating address"})
    }
  }
  export const Deleteaddress=async(req,res)=>{
    try{
        const userId=req.userId
        const id=req.params.id
        if(!id) return res.status(400).json({message:"id is not provided"})
        const deletedAddress=await Address.findByIdAndDelete(id)
       if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
        return res.status(200).json({message:"address deleted successfully",deletedAddress})
    }catch(err){
      console.log(err)
   return res.status(500).json({message:"error in deleting address"})
    }
  }
  export const Addaddress=async(req,res)=>{
    try{
        const userId=req.userId
        console.log('getted here the address call')
  const{phone,email,firstName,street,city}=req.body
   const data=req.body
      console.log(data)
        if(!data||data.length===0) return res.status(400).json({message:"data is not provided"})
  if(!phone||!email||!firstName||!street||!city) return res.status(400).json({message:"all fields are required"})
       
      
        const newAddress=await Address.create({...data,user:userId})
        return res.status(200).json({message:"address added successfully",newAddress})
    }catch(err){
      console.log(err)
       if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Please fill all required fields",
      errors: err.errors,
    });
  }
   return res.status(500).json({message:"error in adding address"})
    }
  }   