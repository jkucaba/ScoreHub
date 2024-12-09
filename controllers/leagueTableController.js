// controllers/leagueTableController.js
const LeagueTableDAO = require('../daos/LeagueTableDAO');
const TeamLeagueTableDAO = require('../daos/TeamLeagueTableDAO');

const getAllLeagueTables = async (req, res) => {
    try {
        const leagueTables = await LeagueTableDAO.getAllLeagueTables();
        res.json(leagueTables);
    } catch (error) {
        console.error("Error fetching league tables:", error);
        res.status(500).json({ error: "Error fetching league tables" });
    }
};

const getLeagueTableById = async (req, res) => {
    const { id } = req.params;
    try {
        const leagueTable = await LeagueTableDAO.getLeagueTableById(id);
        if (!leagueTable) return res.status(404).json({ error: 'League table not found' });
        res.json(leagueTable);
    } catch (error) {
        console.error('Error fetching league table:', error);
        res.status(500).json({ error: 'Error fetching league table' });
    }
};

const createLeagueTable = async (req, res) => {
    const { gameCategory, year, trophy, seasonGamesCount, queueNumber } = req.body;
    try {
        const leagueTable = await LeagueTableDAO.createLeagueTable(gameCategory, year, trophy, seasonGamesCount, queueNumber);
        res.status(201).json(leagueTable);
    } catch (error) {
        console.error('Error creating league table:', error);
        res.status(500).json({ error: 'Error creating league table' });
    }
};

const updateLeagueTable = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const leagueTable = await LeagueTableDAO.updateLeagueTable(id, updates);
        res.json(leagueTable);
    } catch (error) {
        console.error('Error updating league table:', error);
        res.status(500).json({ error: 'Error updating league table' });
    }
};

const deleteLeagueTable = async (req, res) => {
    const { id } = req.params;
    try {
        await LeagueTableDAO.deleteLeagueTable(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting league table:', error);
        res.status(500).json({ error: 'Error deleting league table' });
    }
};

const assignTeamToLeagueTable = async (req, res) => {
    const { leagueTableId, teamId, points } = req.body;
    try {
        const teamLeagueTableEntry = await TeamLeagueTableDAO.createTeamLeagueTableEntry(leagueTableId, teamId, points);
        res.status(201).json(teamLeagueTableEntry);
    } catch (error) {
        if (error.code === '23505') {
            console.warn('Duplicate entry, no action taken:', error.detail);
            res.status(200).json({ message: 'Duplicate entry, no action taken' });
        } else {
            console.error('Error assigning team to league table:', error);
            res.status(500).json({ error: 'Error assigning team to league table' });
        }
    }
};

module.exports = {
    getAllLeagueTables,
    getLeagueTableById,
    createLeagueTable,
    updateLeagueTable,
    deleteLeagueTable,
    assignTeamToLeagueTable,
};