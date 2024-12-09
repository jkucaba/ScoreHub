const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { authenticate, admin } = require('../controllers/authController');

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.post('/', authenticate, admin, teamController.createTeam);
router.put('/update/:id', authenticate, admin, teamController.updateTeam);
router.delete('/:id', authenticate, admin, teamController.deleteTeam);

module.exports = router;