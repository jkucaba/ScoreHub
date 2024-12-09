const express = require('express');
const router = express.Router();
const LineupController = require('../controllers/lineupController');

router.get('/', LineupController.getAllLineups);
router.get('/:matchId', LineupController.getLineupById);
router.post('/', LineupController.createLineup);
router.put('/:id', LineupController.updateLineup);
router.delete('/:id', LineupController.deleteLineup);

module.exports = router;