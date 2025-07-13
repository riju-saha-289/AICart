import jwt from 'jsonwebtoken'
const jwt_secret=process.env.JWT_SECRET;

function generateAdminToken(email) {
        
  const payload = { email: email };
  const token = jwt.sign(
    payload,
    jwt_secret,
    { expiresIn: '7d' }
  ); // Token expires in 1 hour

  return token;
}
export default generateAdminToken;