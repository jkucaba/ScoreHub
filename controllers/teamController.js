const TeamDAO = require('../daos/TeamDAO');

const getAllTeams = async (req, res) => {
    try {
        const teams = await TeamDAO.getAllTeams();
        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ error: "Error fetching teams" });
    }
};

const getTeamById = async (req, res) => {
    try {
        const team = await TeamDAO.getTeamById(req.params.id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.json(team);
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ error: "Error fetching team" });
    }
};

const createTeam = async (req, res) => {
    try {
        const { teamName, foundedYear, stadium, city, country, coach, stadiumCapacity } = req.body;
        const newTeam = await TeamDAO.createTeam(teamName, foundedYear, stadium, city, country, coach, stadiumCapacity);
        res.status(201).json(newTeam);
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Error creating team" });
    }
};

const updateTeam = async (req, res) => {
    try {
        const { teamName, foundedYear, stadium, city, country, coach, stadiumCapacity } = req.body;
        const updatedTeam = await TeamDAO.updateTeam(req.params.id, teamName, foundedYear, stadium, city, country, coach, stadiumCapacity);
        if (!updatedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.json(updatedTeam);
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({ error: "Error updating team" });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const deleted = await TeamDAO.deleteTeam(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ error: "Error deleting team" });
    }
};

module.exports = {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
};