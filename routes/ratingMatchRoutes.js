const express = require('express');
const router = express.Router();
const RatingMatchController = require('../controllers/ratingMatchController');

router.get('/', RatingMatchController.getAllRatingMatches);
router.get('/:id', RatingMatchController.getRatingMatchById);
router.post('/', RatingMatchController.createRatingMatch);
router.put('/:id', RatingMatchController.updateRatingMatch);
router.delete('/:id', RatingMatchController.deleteRatingMatch);

module.exports = router;