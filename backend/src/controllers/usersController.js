const User = require('../models/User'); // Ajustez selon le chemin d'accès à votre modèle User
const { generateToken, hashPassword, comparePassword } = require('./auth');

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  // Validation basique des entrées
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Vérifier si le nom d'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur
    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstname,
      lastname
    });

    const token = generateToken(newUser);
    res.send("Registration successful");
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Connexion de l'utilisateur
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validation des entrées
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Mot de passe oublié (implémentation simple pour le début)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  // Logique pour générer un lien de réinitialisation de mot de passe
  // Cela pourrait impliquer l'envoi d'un email avec un token de réinitialisation
  res.send('Link to reset password was sent to your email.');
};
