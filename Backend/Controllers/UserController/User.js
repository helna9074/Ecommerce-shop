import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator"

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETE_KEY, { expiresIn: "10d" });
};

export const RegisterUser = async (req, res) => {
  try {
    console.log("User router loaded");
    const { firstname,lastname, email, password } = req.body;

    if (!firstname || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }
    if(!validator.isEmail(email)){
  return res.status(400).json({ message: "Invalid email format" });
}

const normalisedEmail = email.toLowerCase();
if (
  password.length < 8 ||
  !/[a-z]/.test(password) ||
  !/[0-9]/.test(password)
) {
  return res.status(400).json({
    message:
      "Password must contain uppercase, lowercase letters and a number",
  });
}

    const userExist = await User.findOne({email:normalisedEmail });
    if (userExist) {
      return res.status(400).json({ message: "this email is taken" });
    }
    const user = await User.create({
      firstname,
      lastname,
      email:normalisedEmail,
      password,
    });
    console.log(user);
    const username= lastname?`${firstname} ${lastname}`:firstname
    res.status(201).json({
      Id: user._id,
      username,
      useremail:user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.log
    return res
      .status(500)
      .json({ message: "error signup the user", error: err.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    console.log("login is on");
    console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }
    const UserExist = await User.findOne({email});
    console.log(UserExist,"found the user");
    if (!UserExist) {
     return res.status(400).json({ message: "There is no User in this Email" });
    }
    const checkPass=await bcrypt.compare(password, UserExist.password);
    if (!checkPass)
      return res.status(400).json({ message: "Invalid Credentials" });

    res.status(200).json({
     Id:UserExist._id,
     username:UserExist.name,
     useremail:UserExist.email,
      token: generateToken(UserExist._id),
    });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Login failed", error: err.message });
  }
};
export const getUser= async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById({_id:userId});
    res.status(201).json({
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email
    });
  } catch(err) {
     console.log(err)
    return res
      .status(500)
      .json({ message: "error in fetching the user", err});
     
  }
};
export const UpdateUser=async(req,res)=>{
  try{
    const userId=req.userId
    const {firstname,lastname,email,currentpassword,newpassword}=req.body
    if(!firstname||!email)
       return res.status(400).json({ message: "all fields required" });
   const user=await User.findById({_id:userId})
   if(!user)
     return res.status(400).json({ message: "There is no user" });
    if(newpassword){
      if(!currentpassword)
        return res.status(400).json({ message: "Current password required" });
    
    const isMatch=await bcrypt.compare(currentpassword,user.password)
    if(!isMatch)
    return res.status(400).json({ message: "Current password is incorrect" });
  if (newpassword.length < 8) {
     return res.status(400).json({ message: "New password too short" });
  }
 
user.password=newpassword;
    }
user.email=email;
user.firstname=firstname,
user.lastname=lastname
await user.save()
     res.status(200).json({
      message: "Profile updated successfully",
      username: user.lastname
        ? `${user.firstname} ${user.lastname}`
        : user.firstname,
      email: user.email,
    });
  }catch(err){
    console.log(err)
return res.status(500).json({message:'internal server error',err})
  }
}