require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Générer une clé secrète si elle n'est pas définie
const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');

// Générer un token JWT
exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '24h' });
};

// Middleware pour vérifier le token
exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

// Hasher le mot de passe
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Vérifier le mot de passe
exports.comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
