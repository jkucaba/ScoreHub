// controllers/matchController.js
const MatchDAO = require('../daos/MatchDAO');

const getAllMatches = async (req, res) => {
    try {
        const matches = await MatchDAO.getAllMatches();
        console.log(matches)
        res.json(matches);
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).json({ error: "Error fetching matches" });
    }
};

const getMatchById = async (req, res) => {
    try {
        const { matchId } = req.params;
        console.log(`Fetching match with matchId: ${matchId}`);
        const match = await MatchDAO.getMatchById(matchId);
        console.log(match)
        res.status(200).json(match);
    } catch (error) {
        console.error('Error fetching match:', error);
        res.status(500).json({ error: 'Failed to fetch match' });
    }
};

const createMatch = async (req, res) => {
    try {
        const { matchDate, judge, homeTeamId, awayTeamId, winnerTeamId } = req.body;
        const match = await MatchDAO.createMatch(matchDate, judge, homeTeamId, awayTeamId, winnerTeamId);
        res.status(201).json(match);
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ error: 'Failed to create match' });
    }
};

const updateMatch = async (req, res) => {
    try {
        const updatedMatch = await MatchDAO.updateMatch(req.params.matchId, req.body);
        res.json(updatedMatch);
    } catch (error) {
        console.error("Error updating match:", error);
        res.status(500).json({ error: "Error updating match" });
    }
};

const deleteMatch = async (req, res) => {
    try {
        const deleted = await MatchDAO.deleteMatch(req.params.matchId);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting match:", error);
        res.status(500).json({ error: "Error deleting match" });
    }
};

module.exports = {
    getAllMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch
};