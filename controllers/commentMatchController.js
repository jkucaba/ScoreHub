// controllers/CommentMatchController.js
const CommentMatchDAO = require('../daos/CommentMatchDAO');

const getAllCommentMatches = async (req, res) => {
    try {
        const commentMatches = await CommentMatchDAO.getAllCommentMatches();
        res.json(commentMatches);
    } catch (error) {
        console.error("Error fetching comment matches:", error);
        res.status(500).json({ error: "Error fetching comment matches" });
    }
};

const getCommentMatchById = async (req, res) => {
    const { id } = req.params;
    try {
        const commentMatch = await CommentMatchDAO.getCommentMatchById(id);
        if (!commentMatch) return res.status(404).json({ error: 'Comment match not found' });
        res.json(commentMatch);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comment match' });
    }
};

const createCommentMatch = async (req, res) => {
    const { text, userId, matchId } = req.body;
    try {
        const commentMatch = await CommentMatchDAO.createCommentMatch(text, userId, matchId);
        res.status(201).json(commentMatch);
    } catch (error) {
        res.status(500).json({ error: 'Error creating comment match' });
    }
};

const updateCommentMatch = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const commentMatch = await CommentMatchDAO.updateCommentMatch(id, text);
        res.json(commentMatch);
    } catch (error) {
        res.status(500).json({ error: 'Error updating comment match' });
    }
};

const deleteCommentMatch = async (req, res) => {
    const { id } = req.params;
    try {
        await CommentMatchDAO.deleteCommentMatch(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting comment match' });
    }
};

module.exports = {
    getAllCommentMatches,
    getCommentMatchById,
    createCommentMatch,
    updateCommentMatch,
    deleteCommentMatch,
};