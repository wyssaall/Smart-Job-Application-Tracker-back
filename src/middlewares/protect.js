import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  try {
    // Express normally lowercases headers, but we can be safe
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader) {
      console.log('Auth middleware failed: No Authorization header');
      return res.status(401).json({
        success: false,
        message: 'No token provided (Authorization header missing)'
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.log('Auth middleware failed: Header does not start with Bearer');
      return res.status(401).json({
        success: false,
        message: 'Invalid token format (Must be Bearer token)'
      });
    }

    const token = authHeader.split(/\s+/)[1];

    if (!token) {
      console.log('Auth middleware failed: Token part is missing after split');
      return res.status(401).json({
        success: false,
        message: 'No token provided (Empty token part)'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_secret);

    // Safety check for decoded payload
    if (!decoded || !decoded.id) {
      console.log('Auth middleware failed: Token decoded but no ID found');
      return res.status(401).json({
        success: false,
        message: 'Invalid token (Incomplete payload)'
      });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    return res.status(401).json({
      success: false,
      message: `Auth Error: ${err.message}` // Return the specific JWT error (expired, invalid signature, etc.)
    });
  }
}

export default protect;