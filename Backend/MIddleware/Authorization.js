import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const Authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];


    if (!token)
      return res.status(401).json({ message: "not authorized, no token", errorCode:"NO_TOKEN" });

    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    // if(decoded.role!=="user") return res.status(403).json({message:"user access only, invalid role",errorCode:"INVALID_ROLE"})
    const user=await User.findById(decoded.id)


    if(!user) return res.status(401).json({message:"user not found",errorCode:"USER_NOT_FOUND"})
      if(user.blocked) {
  return res.status(403).json({
    errorCode: "USER_BLOCKED",
    message: "Your account has been blocked",
    blocked: true
  });
}


    req.userId = decoded.id;

    next();
  } catch (err) {
    console.log("JWT verify error:", err.message);
   if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        errorCode: "TOKEN_EXPIRED",
        message: "JWT expired",
      });
  }
  return res.status(401).json({
      errorCode: "INVALID_TOKEN",
      message: "Invalid token",
    });
}
}

export const adminAuthorization = async (req, res, next) => {
  try {
   
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) 
      return res.status(401).json({ message: "No token Provided" });
 const decoded=jwt.verify(token, process.env.SECRETE_KEY)

    //     if (decoded.role !== "admin") {
    //   return res.status(403).json({
    //     errorCode: "INVALID_ROLE",
    //     message: "Admin access only",
    //   });
    // }

      req.adminId = decoded.id;
      next();
   
  } catch (err) {
     if (err.name === "TokenExpiredError") {
      return res.status(401).json({ errorCode: "TOKEN_EXPIRED" });
    }
    console.error("JWT verify error:", err.message);
    return res.status(401).json({
      errorCode: "TOKEN_EXPIRED",
      message: "JWT expired",
    });
  }
}
