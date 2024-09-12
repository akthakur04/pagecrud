// pages/api/me.js
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export default function handler(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ loggedIn: true, email: decoded.email });
  } catch (error) {
    res.status(401).json({ loggedIn: false });
  }
}
