// controllers/TeamLeagueTableController.js
const TeamLeagueTableDAO = require('../daos/TeamLeagueTableDAO');

const getAllTeamLeagueTableEntries = async (req, res) => {
    try {
        const entries = await TeamLeagueTableDAO.getAllTeamLeagueTableEntries();
        res.json(entries);
    } catch (error) {
        console.error("Error fetching team league table entries:", error);
        res.status(500).json({ error: "Error fetching team league table entries" });
    }
};

const getTeamLeagueTableEntry = async (req, res) => {
    const { leagueTableId, teamId } = req.params;
    try {
        const entry = await TeamLeagueTableDAO.getTeamLeagueTableEntry(leagueTableId, teamId);
        if (!entry) return res.status(404).json({ error: 'Team league table entry not found' });
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching team league table entry' });
    }
};

const createTeamLeagueTableEntry = async (req, res) => {
    const { leagueTableId, teamId, points } = req.body;
    try {
        const entry = await TeamLeagueTableDAO.createTeamLeagueTableEntry(leagueTableId, teamId, points);
        res.status(201).json(entry);
    } catch (error) {
        res.status(500).json({ error: 'Error creating team league table entry' });
    }
};

const updateTeamLeagueTableEntry = async (req, res) => {
    const { leagueTableId, teamId } = req.params;
    const { points } = req.body;
    try {
        const entry = await TeamLeagueTableDAO.updateTeamLeagueTableEntry(leagueTableId, teamId, points);
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: 'Error updating team league table entry' });
    }
};

const deleteTeamLeagueTableEntry = async (req, res) => {
    const { leagueTableId, teamId } = req.params;
    try {
        await TeamLeagueTableDAO.deleteTeamLeagueTableEntry(leagueTableId, teamId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting team league table entry' });
    }
};

module.exports = {
    getAllTeamLeagueTableEntries,
    getTeamLeagueTableEntry,
    createTeamLeagueTableEntry,
    updateTeamLeagueTableEntry,
    deleteTeamLeagueTableEntry,
};