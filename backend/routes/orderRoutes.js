const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
router.get('/allOrders', async (req, res) => {
  try {
    const orders = await Order.find().populate('products.productId'); // Assuming you have user information populated
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/create-order', async (req, res) => {
  const { userId, cartItems, paymentStatus, paymentDetails } = req.body;

  const newOrder = new Order({
    userId,
    products: cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.price,
    })),
    paymentStatus,
    review: null,
  });

  try {
    const savedOrder = await newOrder.save();

    // Update product inventory
    for (const item of cartItems) {
      const product = await Product.findById(item._id);
      if (product) {
        product.inventory -= item.quantity;
        await product.save();
      }
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post('/add-review/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { userId, reviewText } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    order.reviews.push({ userId, reviewText });
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
