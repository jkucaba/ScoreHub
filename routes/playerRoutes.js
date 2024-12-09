const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { authenticate, admin } = require('../controllers/authController');

router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.get('/team/:teamId', playerController.getPlayersByTeamId);
router.post('/', authenticate, admin, playerController.createPlayer);
router.put('/update/:id', authenticate, admin, playerController.updatePlayer);
router.delete('/:id', authenticate, admin, playerController.deletePlayer);

module.exports = router;