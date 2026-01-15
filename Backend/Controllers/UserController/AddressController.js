import Address from "../../models/Address.js"

export const GetAddress=async(req,res)=>{
    try{
        const userId=req.userId
        console.log('this is the user',userId)
        const addressess=await Address.find({user:userId})
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