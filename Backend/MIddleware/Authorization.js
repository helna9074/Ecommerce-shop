import jwt from "jsonwebtoken";

export const Authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(400).json({ message: "not authorized, no token" });

    const decoded = jwt.verify(token, process.env.SECRETE_KEY);

    req.userId = decoded._id;

    next();
  } catch (err) {
    console.log("JWT verify error:", err.message);
    return res.status(401).json({ message: "not authorized, token failed" });
  }
};


export const adminAuthorization = async (req, res, next) => {
  try {
    console.log('reached')
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(400).json({ message: "No token Provided" });

     jwt.verify(token, process.env.SECRETE_KEY,(err,user)=>{
      if(err&&err.name==="TokenExpiredError"){
         return res.status(401).json({ message: "Token expired" });
      }if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
          req.adminId =user._id;
    next();
    });

  
  } catch (err) {
    console.log("JWT verify error:", err.message);
    return res.status(401).json({ message: "not authorized, token failed" });
  }
};