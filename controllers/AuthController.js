const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register= asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  res.json({ success: true, message: 'Registered Successfully' });
})

// @desc    Login user and return JWT token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Credintals'
    })
  }
  const token = jwt.sign({ id: user._id }, process.env.PROCESS_TOKEN_SECRET, { expiresIn: '7d' });
  return res.json({ success: true, token, user: { id: user._id, name: user.name } });
})

module.exports={
  login,register
}