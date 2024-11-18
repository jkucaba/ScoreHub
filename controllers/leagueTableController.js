// controllers/LeagueTableController.js
const LeagueTableDAO = require('../daos/LeagueTableDAO');

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
        res.status(500).json({ error: 'Error fetching league table' });
    }
};

const createLeagueTable = async (req, res) => {
    const { name, season } = req.body;
    try {
        const leagueTable = await LeagueTableDAO.createLeagueTable(name, season);
        res.status(201).json(leagueTable);
    } catch (error) {
        res.status(500).json({ error: 'Error creating league table' });
    }
};

const updateLeagueTable = async (req, res) => {
    const { id } = req.params;
    const { name, season } = req.body;
    try {
        const leagueTable = await LeagueTableDAO.updateLeagueTable(id, name, season);
        res.json(leagueTable);
    } catch (error) {
        res.status(500).json({ error: 'Error updating league table' });
    }
};

const deleteLeagueTable = async (req, res) => {
    const { id } = req.params;
    try {
        await LeagueTableDAO.deleteLeagueTable(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting league table' });
    }
};

module.exports = {
    getAllLeagueTables,
    getLeagueTableById,
    createLeagueTable,
    updateLeagueTable,
    deleteLeagueTable,
};