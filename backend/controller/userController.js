import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: `get current user error ${error}` });
  }
};


export const getAdmin = async (req, res) => {
  try {
    const admin_email = req.adminEmail;
    // console.log(admin_email)
    if (!admin_email) {
      return res.status(404).json({ message: "admin not found" });
    }
    return res.status(200).json({
      email: admin_email,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: `get admin error ${error}` });
  }
};
