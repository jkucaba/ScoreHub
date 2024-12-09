// routes/ratingRoutes.js
const express = require('express');
const RatingController = require('../controllers/ratingController');

const router = express.Router();

router.post('/', RatingController.createRating);
router.get('/:matchId', RatingController.getRatingsByMatchId);
router.get('/player/:playerId', RatingController.getRatingsByPlayerId);
router.get('/', RatingController.getAllRatings);
router.put('/:ratingId', RatingController.updateRating);
router.delete('/:ratingId', RatingController.deleteRating);

module.exports = router;