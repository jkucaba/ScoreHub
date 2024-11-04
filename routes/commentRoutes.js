const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all comments');
});

router.post('/', (req, res) => {
    res.send('Create a new comment');
});

module.exports = router;
