// controllers/MatchEventController.js
const MatchEventDAO = require('../daos/MatchEventDAO');

const getAllMatchEvents = async (req, res) => {
    try {
        const matchEvents = await MatchEventDAO.getAllMatchEvents();
        res.json(matchEvents);
    } catch (error) {
        console.error("Error fetching match events:", error);
        res.status(500).json({ error: "Error fetching match events" });
    }
};

const getMatchEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const matchEvent = await MatchEventDAO.getMatchEventById(id);
        if (!matchEvent) return res.status(404).json({ error: 'Match event not found' });
        res.json(matchEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching match event' });
    }
};

const createMatchEvent = async (req, res) => {
    const { matchId, eventType, minute, playerId } = req.body;
    try {
        const matchEvent = await MatchEventDAO.createMatchEvent(matchId, eventType, minute, playerId);
        res.status(201).json(matchEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error creating match event' });
    }
};

const updateMatchEvent = async (req, res) => {
    const { id } = req.params;
    const { matchId, eventType, minute, playerId } = req.body;
    try {
        const matchEvent = await MatchEventDAO.updateMatchEvent(id, matchId, eventType, minute, playerId);
        res.json(matchEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error updating match event' });
    }
};

const deleteMatchEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await MatchEventDAO.deleteMatchEvent(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting match event' });
    }
};

module.exports = {
    getAllMatchEvents,
    getMatchEventById,
    createMatchEvent,
    updateMatchEvent,
    deleteMatchEvent,
};