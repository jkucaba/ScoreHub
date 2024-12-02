const express = require('express');
const router = express.Router();
const RatingPlayerController = require('../controllers/ratingPlayerController');

router.get('/', RatingPlayerController.getAllRatingPlayers);
//router.get('/:ratingId/:playerId', RatingPlayerController.getRatingPlayer);
router.post('/', RatingPlayerController.createRatingPlayer);
router.delete('/:ratingId/:playerId', RatingPlayerController.deleteRatingPlayer);

module.exports = router;