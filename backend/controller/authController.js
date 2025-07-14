import generateAdminToken from "../config/adminToken.js";
import generateToken from "../config/token.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";

const jwt_secret = process.env.JWT_SECRET;

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be 8 characters minimum" });
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
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ newUser, message: "Registration Successful" });
  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({ message: `Registration failed: ${err.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(existingUser._id);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ existingUser, message: "Logged in successfully" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: `Login error: ${err.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: `Logout error: ${err.message}` });
  }
};

export const loginWithGoogle = async (req, res) => {
  try {
    const { name, email } = req.body;
    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = new User({
        username: name,
        email,
      });

      await newUser.save();
      existingUser = newUser;
    }
    const token = generateToken(existingUser._id);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ user: existingUser, message: "Google logged in successfully" });
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json({ message: `Google login error: ${err.message}` });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      let admin_token = generateAdminToken(email);
      res.cookie("admin_token", admin_token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        domain: ".onrender.com", // Make sure this matches your deployment domain
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({ admin_token, message: "Logged in successfully" });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: `Admin login error: ${err.message}` });
  }
};

export const adminLogout =async(req,res)=>{
  try {
  
    res.clearCookie("admin_token");
    res.status(200).json({ message: "Admin Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: `Admin logout error ${err}` });
  }
  
}
