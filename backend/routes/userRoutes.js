const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const router = express.Router();


router.get('/profile', getProfile);
router.post('/update',  updateProfile);

module.exports = router;
