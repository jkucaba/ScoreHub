// routes/ratingRoutes.js
const express = require('express');
const RatingController = require('../controllers/RatingController');

const router = express.Router();

router.post('/ratings', RatingController.createRating);
router.get('/ratings/:ratingId', RatingController.getRatingById);
router.get('/ratings', RatingController.getAllRatings);
router.put('/ratings/:ratingId', RatingController.updateRating);
router.delete('/ratings/:ratingId', RatingController.deleteRating);

module.exports = router;