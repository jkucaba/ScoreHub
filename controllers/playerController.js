const PlayerDAO = require('../daos/PlayerDAO');

const getAllPlayers = async (req, res) => {
    try {
        const players = await PlayerDAO.getAllPlayers();
        res.json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ error: "Error fetching players" });
    }
};

const getPlayerById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Fetching player with id: ${id}`);
        const player = await PlayerDAO.getPlayerById(id);
        if (!player) return res.status(404).json({ error: 'Player not found' });
        res.json(player);
    } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).json({ error: 'Error fetching player' });
    }
};

const getPlayersByTeamId = async (req, res) => {
    const { teamId } = req.params;
    try {
        const players = await PlayerDAO.getPlayersByTeamId(teamId);
        res.json(players);
    } catch (error) {
        console.error('Error fetching players by team ID:', error);
        res.status(500).json({ error: 'Error fetching players by team ID' });
    }
};

const createPlayer = async (req, res) => {
    const { firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes } = req.body;
    try {
        const player = await PlayerDAO.createPlayer(firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes);
        res.status(201).json(player);
    } catch (error) {
        console.error("Error creating player:", error); // Add error logging
        res.status(500).json({ error: 'Error creating player' });
    }
};
const updatePlayer = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        await PlayerDAO.updatePlayer(id, updates);
        res.status(200).json({ message: 'Player updated successfully' });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).json({ error: 'Error updating player' });
    }
};
const deletePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        await PlayerDAO.deletePlayer(id);
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        console.error('Error deleting player:', error);
        res.status(500).json({ error: 'Error deleting player' });
    }
};
module.exports = {
    getAllPlayers,
    getPlayerById,
    getPlayersByTeamId,
    createPlayer,
    updatePlayer,
    deletePlayer,
};