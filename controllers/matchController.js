const MatchDAO = require('../daos/MatchDAO');

const getAllMatches = async (req, res) => {
    try {
        const matches = await MatchDAO.getAllMatches();
        res.json(matches);
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).json({ error: "Error fetching matches" });
    }
};

const getMatchById = async (req, res) => {
    try {
        const match = await MatchDAO.getMatchById(req.params.id);
        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }
        res.json(match);
    } catch (error) {
        console.error("Error fetching match:", error);
        res.status(500).json({ error: "Error fetching match" });
    }
};

const createMatch = async (req, res) => {
    try {
        const newMatch = await MatchDAO.createMatch(req.body);
        res.status(201).json(newMatch);
    } catch (error) {
        console.error("Error creating match:", error);
        res.status(500).json({ error: "Error creating match" });
    }
};

const updateMatch = async (req, res) => {
    try {
        const updatedMatch = await MatchDAO.updateMatch(req.params.id, req.body);
        if (!updatedMatch) {
            return res.status(404).json({ error: "Match not found" });
        }
        res.json(updatedMatch);
    } catch (error) {
        console.error("Error updating match:", error);
        res.status(500).json({ error: "Error updating match" });
    }
};

const deleteMatch = async (req, res) => {
    try {
        const deleted = await MatchDAO.deleteMatch(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Match not found" });
        }
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
