import Users from '../../models/User.js'
export const GetAllUsers=async(req,res)=>{
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search || ""

    const skip = (page - 1) * limit

    const query = {}

    if (search) {
      query.$or = [
        { firstname: { $regex: search, $options: "i" } },
        {lastname:{$regex:search,$options:"i"}},
        { email: { $regex: search, $options: "i" } }
      ]
    }

    const users = await Users
      .find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .lean()
     
      const usersWithFullname = users.map(user => ({
  ...user,
  fullname: `${user.firstname} ${user.lastname}`
}));

      

    const totalUsers = await Users.countDocuments(query)

    return res.status(200).json({
      message: "Users fetched successfully",
      users:usersWithFullname,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
      }
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
}
export const BlockUser=async(req,res)=>{
  try{
    const {id}=req.params
    if(!id) return res.status(400).json({message:"id is not provided"})
    const user=await Users.findById(id)

    if(!user) return res.status(404).json({message:"user not found"})
      if(user.blocked){
        user.blocked=false
        await user.save()
        return res.status(200).json({message:"user unblocked successfully"})
      }
    user.blocked=true
    await user.save()
    return res.status(200).json({message:"user blocked successfully"})

  }catch(err){
    console.log(err)
    return res.status(500).json({message:"internal server error"})

  }
}