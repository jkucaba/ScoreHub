const express = require('express');
const router = express.Router();
const LeagueTableController = require('../controllers/leagueTableController');

router.get('/', LeagueTableController.getAllLeagueTables);
router.get('/:id', LeagueTableController.getLeagueTableById);
router.post('/', LeagueTableController.createLeagueTable);
router.put('/:id', LeagueTableController.updateLeagueTable);
router.delete('/:id', LeagueTableController.deleteLeagueTable);

module.exports = router;