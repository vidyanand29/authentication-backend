const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddeware = (req, res, next) => {
const authHeader = req.headers['authorization'];
if (!authHeader || !authHeader.startsWith('Bearer')) {
return res.status(401).json({message: "Token missing or invalid format!"});
}
const token = authHeader.split(" ")[1];
try {
const decoded = jwt.verify(token, process.env.SECRET_KEY);
req.user = decoded;
next();
} catch (err) {
return res.status(401).json({message: "Invalid or expired token!"});
}
}

const generateToken = (userData) => {
return jwt.sign(userData, SECRET_KEY,{expiresIn : '1h'});
}

module.exports = {
  generateToken,
  authMiddeware
}