const RatingDTO = require('../dtos/RatingDTO');
const db = require('../database');
const { v4: uuidv4 } = require('uuid');

class RatingDAO {
    async createRating(ratingValue, comment, userId) {
        const ratingId = uuidv4();
        const entityId = uuidv4();
        const entityType = "rating";

        const createdAt = new Date();
        const updatedAt = new Date();

        const query = `
            INSERT INTO rating (ratingId, userId, entityId, entityType, ratingValue, comment, createdAt, updatedAt)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        await db.query(query, [ratingId, userId, entityId, entityType, ratingValue, comment, createdAt, updatedAt]);

        return new RatingDTO(ratingId, userId, entityId, entityType, ratingValue, comment, createdAt, updatedAt);
    }

    async getRatingById(ratingId) {
        const query = 'SELECT * FROM rating WHERE ratingId = $1';
        const result = await db.query(query, [ratingId]);

        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return new RatingDTO(row.ratingid, row.userid, row.entityid, row.entitytype, row.ratingvalue, row.comment, row.createdat, row.updatedat);
    }

    async getRatingsByIds(ratingIds) {
        const query = 'SELECT * FROM rating WHERE ratingId = ANY($1)';
        const result = await db.query(query, [ratingIds]);

        return result.rows.map(row =>
            new RatingDTO(row.ratingid, row.userid, row.entityid, row.entitytype, row.ratingvalue, row.comment, row.createdat, row.updatedat)
        );
    }

    async getAllRatings() {
        const query = 'SELECT * FROM rating';
        const result = await db.query(query);

        return result.rows.map(row =>
            new RatingDTO(row.ratingid, row.userid, row.entityid, row.entitytype, row.ratingvalue, row.comment, row.createdat, row.updatedat)
        );
    }

    async updateRating(ratingId, ratingValue, comment) {
        const updatedAt = new Date();
        const query = `
            UPDATE rating SET ratingValue = $1, comment = $2, updatedAt = $3 WHERE ratingId = $4
        `;
        await db.query(query, [ratingValue, comment, updatedAt, ratingId]);
    }

    async deleteRating(ratingId) {
        const query1 = 'DELETE FROM rating_match WHERE ratingId = $1';
        const query2 = 'DELETE FROM rating_player WHERE ratingId = $1';
        const query = 'DELETE FROM rating WHERE ratingId = $1';
        await db.query(query1, [ratingId]);
        await db.query(query2, [ratingId]);
        await db.query(query, [ratingId]);
    }
}

module.exports = new RatingDAO();