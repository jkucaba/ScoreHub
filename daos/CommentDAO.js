// daos/CommentDAO.js
const db = require('../database');
const CommentDTO = require('../dtos/CommentDTO');
const { v4: uuidv4 } = require('uuid');

class CommentDAO {
    async createComment(userId, entityId, entityType, content) {
        const commentId = uuidv4();
        const query = `
            INSERT INTO comments (commentId, userId, entityId, entityType, content, createdAt, updatedAt)
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        `;
        await db.query(query, [commentId, userId, entityId, entityType, content]);
        return new CommentDTO(commentId, userId, entityId, entityType, content, new Date(), new Date());
    }

    async getCommentById(commentId) {
        const query = 'SELECT * FROM comments WHERE commentId = $1';
        const result = await db.query(query, [commentId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new CommentDTO(row.commentid, row.userid, row.entityid, row.entitytype, row.content, row.createdat, row.updatedat);
    }

    async getAllComments() {
        const query = 'SELECT * FROM comments';
        const result = await db.query(query);
        return result.rows.map(row =>
            new CommentDTO(row.commentid, row.userid, row.entityid, row.entitytype, row.content, row.createdat, row.updatedat)
        );
    }

    async updateComment(commentId, content) {
        const query = 'UPDATE comments SET content = $1, updatedAt = NOW() WHERE commentId = $2 RETURNING *';
        const result = await db.query(query, [content, commentId]);
        const row = result.rows[0];
        return new CommentDTO(row.commentid, row.userid, row.entityid, row.entitytype, row.content, row.createdat, row.updatedat);
    }

    async deleteComment(commentId) {
        const query = 'DELETE FROM comments WHERE commentId = $1';
        await db.query(query, [commentId]);
    }
}

module.exports = new CommentDAO();