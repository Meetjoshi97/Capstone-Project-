const express = require('express');
const { createUser, getAllUsers, updateUser ,deleteUser,getProfile,updateUserProfile} = require('../controllers/userController');
const router = express.Router();

router.get('/profile', getProfile);

router.post('/create', createUser);
router.get('/all', getAllUsers);
router.post('/update', updateUser);
router.delete('/delete/:id', deleteUser);  
router.post('/updateUserProfile',  updateUserProfile);

module.exports = router;
