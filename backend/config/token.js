import jwt from 'jsonwebtoken'
const jwt_secret=process.env.JWT_SECRET;

function generateToken(userId) {
        
  const payload = { userId: userId };
  const token = jwt.sign(
    payload,
    jwt_secret,
    { expiresIn: '7d' }
  ); // Token expires in 1 hour

  return token;
}
export default generateToken