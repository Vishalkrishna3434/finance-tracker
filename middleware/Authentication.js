const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized. No token'
    })
  }
  jwt.verify(token, process.env.PROCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({
      success: false,
      message: 'Not Authorized. Invalid Token'
    })
    req.user = decoded;
    next();
  })

}

module.exports = auth;