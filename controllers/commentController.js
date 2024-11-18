// controllers/CommentController.js
const CommentDAO = require('../daos/CommentDAO');

const getAllComments = async (req, res) => {
    try {
        const comments = await CommentDAO.getAllComments();
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Error fetching comments" });
    }
};

const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await CommentDAO.getCommentById(id);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comment' });
    }
};

const createComment = async (req, res) => {
    const { text, userId, postId } = req.body;
    try {
        const comment = await CommentDAO.createComment(text, userId, postId);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error creating comment' });
    }
};

const updateComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const comment = await CommentDAO.updateComment(id, text);
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error updating comment' });
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await CommentDAO.deleteComment(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting comment' });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};