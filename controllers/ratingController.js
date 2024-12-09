const RatingDAO = require('../daos/RatingDAO');
const RatingPlayerDAO = require('../daos/RatingPlayerDAO');
const RatingMatchDAO = require('../daos/RatingMatchDAO');

const getAllRatings = async (req, res) => {
    try {
        const ratings = await RatingDAO.getAllRatings();
        res.status(200).json(ratings);
    } catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).json({ error: "Error fetching ratings" });
    }
};

const getRatingById = async (req, res) => {
    const { ratingId } = req.params;
    try {
        const rating = await RatingDAO.getRatingById(ratingId);
        if (!rating) return res.status(404).json({ error: 'Rating not found' });
        res.status(200).json(rating);
    } catch (error) {
        console.error("Error fetching rating:", error);
        res.status(500).json({ error: "Error fetching rating" });
    }
};

const getRatingsByMatchId = async (req, res) => {
    const { matchId } = req.params;
    try {
        const ratingIds = await RatingMatchDAO.getRatingIdsByMatchId(matchId);
        if (ratingIds.length === 0) return res.status(404).json({ error: 'No ratings found for this match' });
        const ratings = await RatingDAO.getRatingsByIds(ratingIds);
        res.status(200).json(ratings);
    } catch (error) {
        console.error("Error fetching ratings for match:", error);
        res.status(500).json({ error: "Error fetching ratings for match" });
    }
};

const getRatingsByPlayerId = async (req, res) => {
    const { playerId } = req.params;
    try {
        const ratingIds = await RatingPlayerDAO.getRatingIdsByPlayerId(playerId);
        if (ratingIds.length === 0) return res.status(404).json({ error: 'No ratings found for this player' });
        const ratings = await RatingDAO.getRatingsByIds(ratingIds);
        res.status(200).json(ratings);
    } catch (error) {
        console.error("Error fetching ratings for player:", error);
        res.status(500).json({ error: "Error fetching ratings for player" });
    }
};

const createRating = async (req, res) => {
    const { ratingValue, comment, userId, matchId, playerId } = req.body;
    try {
        const rating = await RatingDAO.createRating(ratingValue, comment, userId);
        if (matchId) {
            await RatingMatchDAO.createRatingMatch(rating.ratingId, matchId);
        }
        if (playerId) {
            await RatingPlayerDAO.createRatingPlayer(rating.ratingId, playerId);
        }
        res.status(201).json(rating);
    } catch (error) {
        console.error("Error creating rating:", error);
        res.status(500).json({ error: "Error creating rating" });
    }
};

const updateRating = async (req, res) => {
    const { ratingId } = req.params;
    const { ratingValue, comment } = req.body;
    try {
        await RatingDAO.updateRating(ratingId, ratingValue, comment);
        res.status(200).json({ message: 'Rating updated successfully' });
    } catch (error) {
        console.error("Error updating rating:", error);
        res.status(500).json({ error: "Error updating rating" });
    }
};

const deleteRating = async (req, res) => {
    const { ratingId } = req.params;
    try {
        await RatingDAO.deleteRating(ratingId);
        res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
        console.error("Error deleting rating:", error);
        res.status(500).json({ error: "Error deleting rating" });
    }
};

module.exports = {
    getAllRatings,
    getRatingById,
    getRatingsByMatchId,
    getRatingsByPlayerId,
    createRating,
    updateRating,
    deleteRating,
};