const express = require('express');
const router = express.Router();
const TeamLeagueTableController = require('../controllers/teamLeagueTableController');

router.get('/', TeamLeagueTableController.getAllTeamLeagueTableEntries);
router.get('/:leagueTableId/:teamId', TeamLeagueTableController.getTeamLeagueTableEntry);
router.post('/', TeamLeagueTableController.createTeamLeagueTableEntry);
router.put('/:leagueTableId/:teamId', TeamLeagueTableController.updateTeamLeagueTableEntry);
router.delete('/:leagueTableId/:teamId', TeamLeagueTableController.deleteTeamLeagueTableEntry);

module.exports = router;