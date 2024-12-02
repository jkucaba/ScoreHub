const express = require('express');
const router = express.Router();
const MatchEventController = require('../controllers/matchEventController');

router.get('/', MatchEventController.getAllMatchEvents);
router.get('/:id', MatchEventController.getMatchEventById);
router.post('/', MatchEventController.createMatchEvent);
router.put('/:id', MatchEventController.updateMatchEvent);
router.delete('/:id', MatchEventController.deleteMatchEvent);

module.exports = router;