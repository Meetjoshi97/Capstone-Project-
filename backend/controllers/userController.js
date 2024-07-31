const User = require('../models/User');
exports.getProfile = async (req, res) => {
    const { email } = req.query;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.updateProfile = async (req, res) => {
    const { email, firstName, lastName, address, phone, country, city, zipCode } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { email, firstName, lastName, address, phone, country, city, zipCode },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Server error' });
    }
  };