// routes/protected.js
const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.use(AuthController.authenticate);

router.get('/protected', (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;