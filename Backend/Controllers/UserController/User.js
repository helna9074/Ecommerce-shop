import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETE_KEY, { expiresIn: "10d" });
};

export const RegisterUser = async (req, res) => {
  try {
    console.log("User router loaded");
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "this email is taken" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);
    res.status(201).json({
      Id: user._id,
      token: generateToken(user._id),
    });
  } catch (err) {
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
    const UserExist = await User.findOne({ email });
    console.log(UserExist);
    if (!UserExist) {
      res.status(400).json({ message: "There is no User in this Email" });
    }
    const checkPass = bcrypt.compare(password, UserExist.password);
    if (!checkPass)
      return res.status(400).json({ message: "Invalid Credentials" });

    res.status(201).json({
      user: UserExist,
      token: generateToken(UserExist._id),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error signup the user", error: err.message });
  }
};
export const Getdetails = async (req, res, next) => {
  try {
    const userid = req.useId;
    const user = await User.findById(userid);
    res.status(201).json({
      user,
    });
  } catch {
    return res
      .status(500)
      .json({ message: "error signup the user", error: err.message });
  }
};
