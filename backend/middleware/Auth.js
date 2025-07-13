
import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
    
    try {
        const token = req.cookies.access_token; 
        // console.log(token)
            if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // 
        // console.log(decoded)
        req.userId = decoded.userId; 
        next(); 
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
