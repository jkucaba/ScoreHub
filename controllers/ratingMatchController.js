// controllers/RatingMatchController.js
const RatingMatchDAO = require('../daos/RatingMatchDAO');

const getAllRatingMatches = async (req, res) => {
    try {
        const ratingMatches = await RatingMatchDAO.getAllRatingMatches();
        res.json(ratingMatches);
    } catch (error) {
        console.error("Error fetching rating matches:", error);
        res.status(500).json({ error: "Error fetching rating matches" });
    }
};

const getRatingMatchById = async (req, res) => {
    const { id } = req.params;
    try {
        const ratingMatch = await RatingMatchDAO.getRatingMatchById(id);
        if (!ratingMatch) return res.status(404).json({ error: 'Rating match not found' });
        res.json(ratingMatch);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rating match' });
    }
};

const createRatingMatch = async (req, res) => {
    const { matchId, ratingValue, comment } = req.body;
    try {
        const ratingMatch = await RatingMatchDAO.createRatingMatch(matchId, ratingValue, comment);
        res.status(201).json(ratingMatch);
    } catch (error) {
        res.status(500).json({ error: 'Error creating rating match' });
    }
};

const updateRatingMatch = async (req, res) => {
    const { id } = req.params;
    const { matchId, ratingValue, comment } = req.body;
    try {
        const ratingMatch = await RatingMatchDAO.updateRatingMatch(id, matchId, ratingValue, comment);
        res.json(ratingMatch);
    } catch (error) {
        res.status(500).json({ error: 'Error updating rating match' });
    }
};

const deleteRatingMatch = async (req, res) => {
    const { id } = req.params;
    try {
        await RatingMatchDAO.deleteRatingMatch(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting rating match' });
    }
};

module.exports = {
    getAllRatingMatches,
    getRatingMatchById,
    createRatingMatch,
    updateRatingMatch,
    deleteRatingMatch,
};