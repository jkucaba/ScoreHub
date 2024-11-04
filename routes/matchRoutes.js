const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all matches');
});

router.post('/', (req, res) => {
    res.send('Create a new match');
});

module.exports = router;
