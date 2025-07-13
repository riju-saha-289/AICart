import jwt from "jsonwebtoken";
export const adminAuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.admin_token;
    if (!token) {
      return res.status(400).json({ message: "Not Authorized Login Again" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(400)
        .json({ message: "Not Authorized Login Again,Invalid token" });
    }
  
    req.adminEmail = decoded.email;
    next();
  } catch (err) {
    console.log("admin auth error");
    res.status(401).json({ message: "admin auth error" });
  }
};
