import generateAdminToken from "../config/adminToken.js";
import generateToken from "../config/token.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";

const jwt_secret = process.env.JWT_SECRET;
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUSer = await User.findOne({ email });
    if (existUSer) {
      return res.status(400).json({ message: "user already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "enter valid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should be 8 character minimum" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    const token = generateToken(newUser._id);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      samesite: "None",
    });

    return res.status(201).json({ newUser, message: "Registration Succesful" });
  } catch (err) {
    console.log("registration  up error");
    res.status(500).json({ message: `registration failed ${err}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUSer = await User.findOne({ email });
    if (!existUSer) {
      return res.status(400).json({ message: "user not exist" });
    }
    const match = await bcrypt.compare(password, existUSer.password);
    if (!match) {
      return res.status(400).json({ message: "incorrect password" });
    }

    const token = generateToken(existUSer._id);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      samesite:"strict",
      maxAge: 7 * 24 * 60 *60 *1000
    });
    return res.status(400).json({ existUSer, message: "Loged in succesfully" });
  } catch (err) {
    return res.status(500).json(`login error ${err}`);
  }
};

export const logout = async (req, res) => {
  console.log("hi")
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: `logout error ${err}` });
  }
};

export const loginWithGoogle = async (req, res) => {
  try {
    const { name,email } = req.body;
    let existUSer = await User.findOne({ email });
   
    if (!existUSer) {
      const newUser = new User({
      username: name,
      email:email,
      });

    await newUser.save();
    existUSer = newUser;
    }
    const token = generateToken(existUSer._id);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
    });
    return res.status(201).json({ user:existUSer, message: " google Loged in succesfully" });
  } catch (err) {
    return res.status(500).json(`google login error ${err}`);
  }
};

export const adminLogin=async(req,res)=>{
  try {
    const { email, password } = req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      let admin_token=generateAdminToken(email)
      res.cookie("admin_token", admin_token, {
      httpOnly: true,
      secure: false,
      samesite:"strict",
      maxAge: 7 * 24 * 60 *60 *1000
    });
    return res.status(201).json({ admin_token, message: "Loged in succesfully" });
    }
    return res.status(404).json({message:"invalid Credential"})
     
  } catch (error) {
    return res.status(404).json(`Admin login error ${err}`);
  }
}

export const adminLogout =async(req,res)=>{
  try {
  
    res.clearCookie("admin_token");
    res.status(200).json({ message: "Admin Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: `Admin logout error ${err}` });
  }
  
}