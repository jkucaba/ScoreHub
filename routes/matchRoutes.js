const express = require('express');
const router = express.Router();
const matchController = require("../controllers/matchController");
const {authenticate, admin} = require('../controllers/authController');

router.get('/', matchController.getAllMatches);
router.get('/details/:matchId', matchController.getMatchById);
router.put('/update/:matchId', authenticate, admin, matchController.updateMatch);
router.post('/', authenticate, admin, matchController.createMatch);
router.delete('/:matchId', authenticate, admin, matchController.deleteMatch);

module.exports = router;
