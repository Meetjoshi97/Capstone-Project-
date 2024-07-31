const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(req)
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully'
     
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {    console.log(user)

      res.json({
        message: 'Login successful',

        user:{ id: user._id,
          username: user.username,
          email: user.email,isAdmin:user?.isAdmin}
       
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword =   async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: 'Password reset  successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};