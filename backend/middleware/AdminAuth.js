import jwt from "jsonwebtoken";

export const adminAuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.admin_token;
    if (!token) {
      return res.status(401).json({ message: "Not Authorized, please login again" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Not Authorized, invalid token" });
    }

    console.log("Decoded admin token:", decoded);
    req.adminEmail = decoded.email;
    next();
  } catch (err) {
    console.log("admin auth error:", err.message);
    res.status(401).json({ message: "Admin authentication failed" });
  }
};
