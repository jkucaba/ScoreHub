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
    try {
        const player = await PlayerDAO.getPlayerById(req.params.id);
        if (!player) {
            return res.status(404).json({ error: "Player not found" });
        }
        res.json(player);
    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ error: "Error fetching player" });
    }
};

const createPlayer = async (req, res) => {
    const { firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes } = req.body;
    try {
        const player = await PlayerDAO.createPlayer(firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes);
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ error: 'Error creating player' });
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
};
