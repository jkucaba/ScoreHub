const LineupDAO = require('../daos/LineupDAO');

const getAllLineups = async (req, res) => {
    try {
        const lineups = await LineupDAO.getAllLineups();
        res.json(lineups);
    } catch (error) {
        console.error("Error fetching lineups:", error);
        res.status(500).json({ error: "Error fetching lineups" });
    }
};

const getLineupById = async (req, res) => {
    const { matchId } = req.params;
    try {
        const lineup = await LineupDAO.getLineupById(matchId);
        if (!lineup) return res.status(404).json({ error: 'Lineup not found' });
        res.json(lineup);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching lineup' });
    }
};

const createLineup = async (req, res) => {
    const { matchId, playerId } = req.body;
    try {
        console.log(`Creating lineup with matchId: ${matchId}, playerId: ${playerId}`); // Add logging
        const lineup = await LineupDAO.createLineup(matchId, playerId);
        res.status(201).json(lineup);
    } catch (error) {
        console.error('Error creating lineup:', error); // Add logging
        res.status(500).json({ error: 'Error creating lineup' });
    }
};

const updateLineup = async (req, res) => {
    const { id } = req.params;
    const { matchId, playerId, position } = req.body;
    try {
        const lineup = await LineupDAO.updateLineup(id, matchId, playerId, position);
        res.json(lineup);
    } catch (error) {
        res.status(500).json({ error: 'Error updating lineup' });
    }
};

const deleteLineup = async (req, res) => {
    const { id } = req.params;
    try {
        await LineupDAO.deleteLineup(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting lineup' });
    }
};

module.exports = {
    getAllLineups,
    getLineupById,
    createLineup,
    updateLineup,
    deleteLineup,
};