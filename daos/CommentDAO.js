const db = require('../database');
const CommentDTO = require('../dtos/CommentDTO');
const { v4: uuidv4 } = require('uuid');

class CommentDAO {
    async createComment(userId, content) {
        const commentId = uuidv4();
        const entityId = uuidv4();
        const entityType = "comment"
        const query = `
            INSERT INTO comment (commentId, userId, entityId, entityType, content, createdAt, updatedAt)
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        `;
        await db.query(query, [commentId, userId, entityId, entityType, content]);
        return new CommentDTO(commentId, userId, entityId, entityType, content, new Date(), new Date());
    }

    async getCommentById(commentId) {
        const query = 'SELECT * FROM comment WHERE commentId = $1';
        const result = await db.query(query, [commentId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new CommentDTO(row.commentid, row.userid, row.entityid, row.entitytype, row.content, row.createdat, row.updatedat);
    }

    async getCommentsByIds(commentIds) {
        const query = 'SELECT * FROM comment WHERE commentId = ANY($1)';
        const result = await db.query(query, [commentIds]);
        return result.rows.map(row =>
            new CommentDTO(row.commentid, row.userid, row.entityid, row.entitytype, row.content, row.createdat, row.updatedat)
        );
    }

    async getAllComments() {
        const query = 'SELECT * FROM comment';
        const result = await db.query(query);
        return result.rows.map(row =>
            new CommentDTO(row.commentid, row.userid, row.entityid, row.entitytype, row.content, row.createdat, row.updatedat)
        );
    }

    async updateComment(commentId, content) {
        const query = 'UPDATE comment SET content = $1, updatedAt = NOW() WHERE commentId = $2 RETURNING *';
        const result = await db.query(query, [content, commentId]);
        const row = result.rows[0];
        return new CommentDTO(row.commentid, row.userid, row.entityid, row.entitytype, row.content, row.createdat, row.updatedat);
    }

    async deleteComment(commentId) {
        const query1 = 'DELETE FROM comment_match WHERE commentId = $1';
        const query = 'DELETE FROM comment WHERE commentId = $1';
        await db.query(query1, [commentId]);
        await db.query(query, [commentId]);
    }
}

module.exports = new CommentDAO();