const RatingDTO = require('../dtos/RatingDTO');

const db = require('../database');
const { v4: uuidv4 } = require('uuid');

class RatingDAO {
    async createRating(ratingValue, comment, userId, teamId) {
        const ratingId = uuidv4();
        const createdAt = new Date();
        const updatedAt = new Date();

        const query = `
            INSERT INTO Rating (ratingId, ratingValue, comment, userId, teamId, createdAt, updatedAt)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await db.query(query, [ratingId, ratingValue, comment, userId, teamId, createdAt, updatedAt]);

        return new RatingDTO(ratingId, ratingValue, comment, userId, teamId, createdAt, updatedAt);
    }

    async getRatingById(ratingId) {
        const query = 'SELECT * FROM Rating WHERE ratingId = $1';
        const result = await db.query(query, [ratingId]);

        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return new RatingDTO(row.ratingid, row.ratingvalue, row.comment, row.userid, row.teamid, row.createdat, row.updatedat);
    }

    async getAllRatings() {
        const query = 'SELECT * FROM Rating';
        const result = await db.query(query);

        return result.rows.map(row =>
            new RatingDTO(row.ratingid, row.ratingvalue, row.comment, row.userid, row.teamid, row.createdat, row.updatedat)
        );
    }

    async updateRating(ratingId, ratingValue, comment) {
        const updatedAt = new Date();
        const query = `
            UPDATE Rating SET ratingValue = $1, comment = $2, updatedAt = $3 WHERE ratingId = $4
        `;
        await db.query(query, [ratingValue, comment, updatedAt, ratingId]);
    }

    async deleteRating(ratingId) {
        const query = 'DELETE FROM Rating WHERE ratingId = $1';
        await db.query(query, [ratingId]);
    }
}

module.exports = new RatingDAO();