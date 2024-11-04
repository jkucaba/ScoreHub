const CommentDTO = require('../dtos/CommentDTO');

class CommentDAO {
    async createComment(userId, entityId, entityType, content) {}
    async getCommentById(commentId) {}
    async getCommentsByEntity(entityId) {}
    async updateComment(commentId, content) {}
    async deleteComment(commentId) {}
}

module.exports = new CommentDAO();
