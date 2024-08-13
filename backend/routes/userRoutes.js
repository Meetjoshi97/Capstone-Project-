const express = require('express');
const { createUser, getAllUsers, updateUser ,deleteUser} = require('../controllers/userController');
const router = express.Router();

router.post('/create', createUser);
router.get('/all', getAllUsers);
router.post('/update', updateUser);
router.delete('/delete/:id', deleteUser);  

module.exports = router;
