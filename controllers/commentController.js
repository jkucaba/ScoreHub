const CommentDAO = require('../daos/CommentDAO');
const CommentMatchDAO = require('../daos/CommentMatchDAO');

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

const getCommentsByMatchId = async (req, res) => {
    const { matchId } = req.params;
    try {
        const commentIds = await CommentMatchDAO.getCommentIdsByMatchId(matchId);
        console.log(commentIds);
        if (commentIds.length === 0) return res.status(404).json({ error: 'No comments found for this match' });
        const comments = await CommentDAO.getCommentsByIds(commentIds);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments for match' });
    }
};

const createComment = async (req, res) => {
    const { text, userId, matchId } = req.body;
    try {
        const comment = await CommentDAO.createComment(userId, text);
        await CommentMatchDAO.createCommentMatch(comment.commentId, matchId);
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
    getCommentsByMatchId,
    createComment,
    updateComment,
    deleteComment,
};