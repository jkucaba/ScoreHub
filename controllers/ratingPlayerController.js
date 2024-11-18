// controllers/RatingPlayerController.js
const RatingPlayerDAO = require('../daos/RatingPlayerDAO');

const getAllRatingPlayers = async (req, res) => {
    try {
        const ratingPlayers = await RatingPlayerDAO.getAllRatingPlayers();
        res.json(ratingPlayers);
    } catch (error) {
        console.error("Error fetching rating players:", error);
        res.status(500).json({ error: "Error fetching rating players" });
    }
};

const getRatingPlayerById = async (req, res) => {
    const { ratingId, playerId } = req.params;
    try {
        const ratingPlayer = await RatingPlayerDAO.getRatingPlayer(ratingId, playerId);
        if (!ratingPlayer) return res.status(404).json({ error: 'Rating player not found' });
        res.json(ratingPlayer);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rating player' });
    }
};

const createRatingPlayer = async (req, res) => {
    const { ratingId, playerId } = req.body;
    try {
        const ratingPlayer = await RatingPlayerDAO.createRatingPlayer(ratingId, playerId);
        res.status(201).json(ratingPlayer);
    } catch (error) {
        res.status(500).json({ error: 'Error creating rating player' });
    }
};

const deleteRatingPlayer = async (req, res) => {
    const { ratingId, playerId } = req.params;
    try {
        await RatingPlayerDAO.deleteRatingPlayer(ratingId, playerId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting rating player' });
    }
};

module.exports = {
    getAllRatingPlayers,
    getRatingPlayerById,
    createRatingPlayer,
    deleteRatingPlayer,
};