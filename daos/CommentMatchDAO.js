const db = require('../database');
const CommentMatchDTO = require('../dtos/CommentMatchDTO');
const { v4: uuidv4 } = require('uuid');

class CommentMatchDAO {
    async createCommentMatch(commentId, matchId) {
        const query = `
            INSERT INTO comment_match (commentId, matchId)
            VALUES ($1, $2)
        `;
        await db.query(query, [commentId, matchId]);
        return new CommentMatchDTO(commentId, matchId);
    }

    async getCommentMatch(commentId, matchId) {
        const query = 'SELECT * FROM comment_match WHERE commentId = $1 AND matchId = $2';
        const result = await db.query(query, [commentId, matchId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new CommentMatchDTO(row.commentid, row.matchid);
    }

    async getCommentIdsByMatchId(matchId) {
        const query = 'SELECT commentId FROM comment_match WHERE matchId = $1';
        const result = await db.query(query, [matchId]);
        return result.rows.map(row => row.commentid);
    }

    async deleteCommentMatch(commentId, matchId) {
        const query = 'DELETE FROM comment_match WHERE commentId = $1 AND matchId = $2';
        await db.query(query, [commentId, matchId]);
    }
}

module.exports = new CommentMatchDAO();