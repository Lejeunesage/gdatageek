const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
