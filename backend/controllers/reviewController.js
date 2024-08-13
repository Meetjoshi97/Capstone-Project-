const Review = require('../models/Review');
const User = require('../models/User');

const addReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error adding review', error });
  }
};


const getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getReviewsByProductId };


module.exports = {
  addReview,
  getReviewsByProductId,
};
